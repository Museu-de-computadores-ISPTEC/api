import _Controller_ from "../core/controller";
import { Request, Response } from "express";
import { Exposicao, ExposicaoSlide, ExposicaoSlideSub } from '../db/models/exposicao';

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
             await Exposicao.destroy({
                where: {
                    id: req.params.id
                }
            });
            return controller.JsonResponse(res, {exposicao: true});
        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

    //Método Responsável por atualizar os dados de uma exposicao
    //Método: PUT
    //Rota: /exposicao/:id
    public async ExposicoesAtualizar(req: Request, res: Response){
        try{
             //se existir uma exposicao , atualiza os dados da exposicao e retorna um { exposicao: true}
             await Exposicao.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            return controller.JsonResponse(res, {exposicao: true});

        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

    ///////////////////// Slides /////////////////////////////
    //Método Responsável por retornar todos os slides de uma exposicao
    //Método: GET
    //Rota: /exposicao/:id/slides
    public async Slides(req: Request, res: Response){
        try{
            let slides = await ExposicaoSlide.findAll({
                where: {
                    id_exposicao: req.params.id
                }
            });
            return controller.JsonResponse(res, {exposicao: true, slides: slides}); 
        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

    //Método Responsável por registrar um slide
    //Método: POST
    //Rota: /exposicao/:id/slides
    public async SlideRegistrar(req: Request, res: Response){
        try{
            let corpo = req.body;
            corpo['id_exposicao'] = req.params.id;
            let slide = await ExposicaoSlide.create(corpo);
            return controller.JsonResponse(res, slide);
        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

    //Método Responsável por deletar um slide
    //Método: DELETE
    //Rota: /exposicao/:id/slides/:slide
    public async SlideDeletar(req: Request, res: Response){
        try{
            await ExposicaoSlide.destroy({
                where: {
                    id: req.params.slide
                }
            })
            return controller.JsonResponse(res, {slide: true});
        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

    //Método Responsável atualizar os dados de um slide um slide
    //Método: PUT
    //Rota: /exposicao/:id/slides/:slide
    public async SlideAtualizar(req: Request, res: Response){
        try{
            await ExposicaoSlide.update(req.body, {
                where: {
                    id: req.params.slide
                }
            })
            return controller.JsonResponse(res, {slide: true});
        }catch(error){
            return controller.ErrorResponse(res, error);
        }
    }

}