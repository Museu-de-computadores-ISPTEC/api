import HttpException from "classes/HttpException";
import { Request, Response, NextFunction } from 'express';

export default function ErrorHandler(error: HttpException, req: Request, res: Response, next: NextFunction){
    const status = error.statusCode || error.status || 500;
    res.status(status).send(error);
}