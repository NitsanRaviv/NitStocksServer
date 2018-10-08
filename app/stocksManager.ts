import * as socketIO from 'socket.io';
import { Stock } from './models/Stock';

const UPDATE_TIME = 2000;

export class StocksManager{

    private allStocks: Array<Stock>;
    private io: socketIO.Server;
    static stocksManager: StocksManager;

    start(_io: SocketIO.Server){
        this.io = _io;
        this.getAllStocks();
        this.updateStocksPrices();
    }

    async getAllStocks(){
        this.allStocks = await Stock.findAll();
    }

    async updateStocksPrices(){
        setInterval(() => { 
            this.allStocks.forEach(async stock =>{
                const stockName = stock.name;
                const newPrice = this.getCurrentPrice(stock.currentPrice);
                stock.currentPrice = newPrice;
                await Stock.update(stock, { where: { stockName } });
            })
                this.getAllStocks();
                this.io.emit('priceUpdate', this.allStocks);
        }, UPDATE_TIME);
    }

    static getInstance(){
        if(this.stocksManager == null){
            this.stocksManager = new StocksManager();
        }

        return this.stocksManager;
    }

    getCurrentPrice(lastPrice: number){
        var maxRange = lastPrice + 1;
        var minRange = lastPrice - 1;
        
        return Math.random() * (maxRange - minRange ) + minRange;
    }
}