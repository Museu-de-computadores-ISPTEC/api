import { Response } from 'express';

export default class _Controller_{

    public OkResponse(res: Response){
        return res.sendStatus(200);
    }

    public CratedResponse(res: Response){
        return res.sendStatus(201);
    }

    public JsonResponse(res: Response, json: object){
        return res.status(200).json(json);
    }

    public SendResponse(res: Response, code: number, text: string){
        return res.status(code).send(text);
    }

    public RenderResponse(res: Response, view: string, data: object): void{
        return res.render(view, data);
    }

    public UnauthorizedResponse(res: Response, message?: string){
        return res.status(401).send(message ? message: "acção solicitada não autorizada");
    }

    public NotFoundResponse(res: Response){
        return res.status(404).send("conteudo solicitado não encontrado");
    }

    public ErrorResponse(res: Response, error: Error | string){
        console.error(error);
        return res.status(500).send("erro interno do servidor");
    }
}
