import {JsonController, UseBefore, Body, Get, Post} from "routing-controllers";
import { Action } from '../models/Action';
import { HeadersMiddleware } from '../headers';


@JsonController()
@UseBefore(HeadersMiddleware)
export class ActionsController {

    @Get("/actions") // get all actions
    async getAllActions() {
        const allActions:Array<any> = await Action.findAll();
        return allActions.map((allActions:any)=> allActions.toJSON());
    }

    @Post("/actions") // add new action
    async addNewAction(@Body() actionToCreate: any) {
        const newAction:any = await Action.create( actionToCreate );
        return newAction.toJSON();
    }
}