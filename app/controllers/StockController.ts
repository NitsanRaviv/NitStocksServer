import {JsonController, Param, Body, Get, Post, Put, Delete} from "routing-controllers";
import { Stock } from '../models/Stock';
//import { LogicManager } from "../logicManager";




@JsonController()
export class StockController {


    @Get("/stocks") // get all stocks 
    async getAllStocks() {
        const allStocks:Array<Stock> = await Stock.findAll();
        return allStocks.map((allStocks:Stock)=> allStocks.toJSON());
    }

    @Get("/stocks/:name") // get specific stock by name
    async getSelctedStock(@Param("name") name: string) {
        const theStock:any = await Stock.find( { where: { name } } );
        return theStock.toJSON();
    }

    @Post("/stocks") // add new stock
    async addNewStock(@Body() stockToCreate: any) {
        const newStock:Stock = await Stock.create( stockToCreate );
        return newStock.toJSON();
    }

    @Put("/stocks/:name") // update stock by name
    async updateStock(@Param("name") name: string, @Body() stock: any ){
        const changes:any = await Stock.update( stock, { where: { name } } );
        return changes;
    }


    @Delete("/stocks/:name") // delete stock by name
    async removeStock(@Param("name") name: string) {
        const destroyedStock:any = await Stock.destroy({ where: { name } })
        return destroyedStock;
    }
}