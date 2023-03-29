import _Controller_ from "../core/controller";
import { Request, Response } from "express";

let controller = new _Controller_;

export default class HomeController{
    constructor(){}
    public Home(req: Request, res: Response){
        controller.SendResponse(res, 200, "hello world");
    }
}