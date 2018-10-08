import "reflect-metadata"; 
import {createExpressServer} from "routing-controllers";
import * as socketIO from 'socket.io';
import * as express from 'express';
import {StockController} from "./controllers/StockController";
import {sequelize} from './sequelize';
import { ActionsController } from "./controllers/ActionsController";
import { PortfolioController } from "./controllers/PortfolioController";
import { StocksManager } from "./stocksManager";

export class Server{
    private io: socketIO.Server;
    private app: express.Application;
    private port: number;

    constructor(){
        this.port = Number(process.env.PORT);
        this.createExpressServer();
        sequelize.sync(/*{force: true}*/);
        this.createSockets();
    }

    createExpressServer(){
        this.app = createExpressServer({cors: true, 
            controllers: [StockController, ActionsController, PortfolioController]});
    }

    createSockets(){
        this.io = socketIO().listen(this.app.listen(this.port));
    }

    init(){
        StocksManager.getInstance().start(this.io);
    }
}  