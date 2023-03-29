import { Request, Response, NextFunction } from "express";

export default function NotFound(req: Request, res: Response, next: NextFunction){
    const message = "recurso solicitado não encontrado";
    res.status(404).send(message);
}