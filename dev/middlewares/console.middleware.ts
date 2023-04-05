import HttpException from "classes/HttpException";
import { Request, Response, NextFunction } from 'express';

export default function Console(req: Request, res: Response, next: NextFunction){
    console.log(req.query);
    next();
}