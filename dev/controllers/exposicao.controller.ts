import _Controller_ from "../core/controller";
import { Request, Response } from "express";
import { Exposicao, ExposicaoSlide, ExposicaoSlideSub } from '../db/models/exposicao';
import { validationResult } from "express-validator";

let controller = new _Controller_;

export default class ExposicaoController{
    constructor(){}

    ///////////////////// Exposição /////////////////////////////

    //Método Responsável por retornar uma lista de exposições
    //Método: GET
    //Rota: /exposicao
    public async Exposicoes(req: Request, res: Response){
        try{

            let exposicoes = await Exposicao.findAll();
            return controller.JsonResponse(res, exposicoes);
        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

    //Método Responsável por retornar uma exposicao com base no id
    //Método: GET
    //Rota: /exposicao/:id
    public async Exposicao(req: Request, res: Response){
        try{
            let exposicao: any = await Exposicao.findOne({
                where: {
                    id: req.params.id
                }
            });
            return controller.JsonResponse(res, exposicao);
        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

    //Método Responsável por registrar uma exposicao
    //Método: POST
    //Rota: /exposicao
    public async ExposicaoRegistrar(req: Request, res: Response){
        try{
            //buscando uma exposicao com o mesmo titulo da exposicao a ser criada
            let exposicoes = await Exposicao.findOne({
                where: {
                    titulo: req.body.titulo
                }
            });

            //se existir uma exposicao com o mesmo titulo, retorna um { titulo: false }
            if(exposicoes != null){
                return controller.JsonResponse(res, {titulo: false});
            }else{
                //se não existir uma exposicao com o mesmo titulo, cria a exposicao e retorna um { titulo: false, id: <id da exposicao> }
                let exposicao: any = await Exposicao.create(req.body);
                return controller.JsonResponse(res, {titulo: true, id: exposicao.id});
            }
        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

    //Método Responsável por deletar uma esposicao
    //Método: DELETE
    //Rota: /exposicao/:id
    public async ExposicoesDeletar(req: Request, res: Response){
        try{
            //buscando uma exposicao com base no id
            let exposicoes = await Exposicao.findOne({
                where: {
                    id: req.params.id
                }
            });

            //se não existir uma exposicao com o id escolhido, retorna um { exposicao: false }
            if(exposicoes == null){
                return controller.JsonResponse(res, {exposicao: false});
            }else{
                //se existir uma exposicao, deleta a exposicao e retorna um { exposicao: true}
                await Exposicao.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                return controller.JsonResponse(res, {exposicao: true});
            }

        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

    //Método Responsável por atualizar os dados de uma exposicao
    //Método: PUT
    //Rota: /exposicao/:id
    public async ExposicoesAtualizar(req: Request, res: Response){
        try{
            //buscando uma exposicao com base no id
            let exposicoes = await Exposicao.findOne({
                where: {
                    id: req.params.id
                }
            });

            //se não existir uma exposicao com o id escolhido, retorna um { exposicao: false }
            if(exposicoes == null){
                return controller.JsonResponse(res, {exposicao: false});
            }else{
                //se existir uma exposicao , atualiza os dados da exposicao e retorna um { exposicao: true}
                await Exposicao.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });
                return controller.JsonResponse(res, {exposicao: true});
            }

        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

    ///////////////////// Slides /////////////////////////////
    
}