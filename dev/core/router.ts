import express from 'express';
import { Router } from 'express';
import { Route } from '../intrefaces/route';

export default abstract class _Router_ {

    private router: Router;
    private routes: Array<Route>;
    private middlewares: Array<any>;

    constructor() {
        this.router = express.Router();
        this.routes = [];
        this.middlewares = [];
    }

    private Make(){
        this.middlewares.forEach((middleware, index, array)=>{
            this.router.use(middleware);
        });

        this.routes.forEach((route, index, array)=>{
            if(typeof route.middleware == 'undefined'){
                route.middleware = [];
            }
            switch (route.method) {
                case 'get':
                        this.router.get(route.url, route.middleware, route.function);    
                    break;
                case 'post':
                        this.router.post(route.url, route.middleware, route.function);
                    break;
                case 'put':
                        this.router.put(route.url, route.middleware, route.function);
                    break;
                case 'delete':
                        this.router.delete(route.url, route.middleware, route.function);
                    break;
                case 'patch':
                        this.router.patch(route.url, route.middleware, route.function);
                    break;
                case 'head':
                        this.router.head(route.url, route.middleware, route.function);
                    break;
                default:
                        this.router.get(route.url, route.middleware, route.function);    
                    break;
            } 
            return this.router;
        });
    }
    
    protected SetRoutes(routes: Array<Route>, middlewares?: Array<any>): void{
        this.routes = routes;
        if(typeof middlewares == 'object'){
            this.middlewares = middlewares;
        }
    }
    
    public GetRoutes(): Router{
        return this.router;
    }
    
    protected MakeRoutes(){
        this.Make();
    }

}
