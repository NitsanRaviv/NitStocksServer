import {ExpressMiddlewareInterface} from "routing-controllers";

export class HeadersMiddleware implements ExpressMiddlewareInterface {

    use(request: any, response: any, next: (err?: any) => any): any {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
}