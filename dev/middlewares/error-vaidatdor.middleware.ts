import HttpException from "classes/HttpException";
import { Request, Response, NextFunction } from 'express';
import { validationResult } from "express-validator";

export default function ErrorValidar(req: Request, res: Response, next: NextFunction){
    //Verifica se existem erros de validaçãos dos dados enviados pelo usuario, caso existam, envia as mensagens de erro ao usuario
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(422).json({ errors: erros.array() });
    }
    next();
}