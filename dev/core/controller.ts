/**
 * CORE controller
 * Arquivo responsável por definir os métodos básicos do CORE controller
 * Na classe controller apenas são definidos métodos para a tratar de respostas a requisições
 */


//Importação de interfces do express
import { Response } from 'express';

//Definição da classe Controller
export default class _Controller_{

    //Por padrão, todos os métodos desta classe, recebem como primeiro parametro o objecto de resposta (Response, cuja a interface foi importada do express) da aplicação

    //Método responsável por emitir um código de status 200 (Tudo OK)
    public OkResponse(res: Response){
        return res.sendStatus(200);
    }

    //Método responsável por emitir um código de status 201 (Criado)
    public CratedResponse(res: Response){
        return res.sendStatus(201);
    }

    //Método responsável por responder com um código Json e um código de status 200
    public JsonResponse(res: Response, json: object){
        return res.status(200).json(json);
    }

    //Método responsável por enviar um texo e um código de status
    public SendResponse(res: Response, code: number, text: string){
        return res.status(code).send(text);
    }

    //Método responsável renderizar um template mesclado com dados
    public RenderResponse(res: Response, view: string, data: object): void{
        return res.render(view, data);
    }

    //Método responsável por responder com o código 401 (não autorizado) e uma mensagem de associada ao código em questão
    public UnauthorizedResponse(res: Response, message?: string){
        return res.status(401).send(message ? message: "acção solicitada não autorizada");
    }

    //Método responsável por responder com o código 404 (recurso não enconytrado) e uma mensagem de associada ao código em questão
    public NotFoundResponse(res: Response){
        return res.status(404).send("recurso solicitado não encontrado");
    }

    //Método responsável por responder com o código 500 (erro interno no servidor) e uma mensagem de associada ao código em questão
    public ErrorResponse(res: Response, error: any){
        console.error(error);
        return res.status(500).send("erro interno do servidor");
    }

    //Método responsável por responder com o código 422 (erro navalidação de dados)
    public ValidationError(res: Response, json: any){
        res.status(422).json({ errors: json.array() });
    }
}
