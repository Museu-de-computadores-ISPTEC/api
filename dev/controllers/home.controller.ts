import _Controller_ from "../core/controller";
import { Request, Response } from "express";

let controller = new _Controller_;

class Controller{

    SendResponse(res: Response){
        return res.status(200).send("Hello world");
    }

}

interface Icontroller{
    SendResponse(res: Response): any
}

class HomeController extends Controller{

    

    constructor(){
        super();
    }


    Home(req: Request, res: Response){
        try{
        
            this.SendResponse(res);
        }catch(error){
            console.log(error);
        }
        
    }


    Sobre(req: Request, res: Response){
        controller.SendResponse(res, 200, "sobre");
    }
}

let a = new HomeController();
export default a;
