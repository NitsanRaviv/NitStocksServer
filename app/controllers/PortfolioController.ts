import {JsonController, UseBefore, Body, Get, Post, Put, Param, Delete} from "routing-controllers";
import { HeadersMiddleware } from '../headers';
import { Portfolio } from "../models/Portfolio";


@JsonController()
@UseBefore(HeadersMiddleware)
export class PortfolioController {

    @Get("/portfolio") 
    async getPortfolio() {
        const portfolio:Array<any> = await Portfolio.findAll();
        return portfolio.map((portfolio:any)=> portfolio.toJSON());
    }

    @Post("/portfolio") 
    async addStockToPortfolio(@Body() stockToAdd: any) {
        const newStock:any = await Portfolio.create( stockToAdd );
        return newStock.toJSON();
    }

    @Put("/portfolio/:stockName") 
    async updateAction(@Param("stockName") stockName: string, @Body() lineToUpdate: any ){
        const changes:any = await Portfolio.update( lineToUpdate, { where: { stockName } } );
        return changes;
    }

    @Delete("/portfolio/:stockName") 
    async removeStock(@Param("stockName") stockName: string) {
        const destroyedStock:any = await Portfolio.destroy({ where: { stockName } })
        return destroyedStock;
    }
}