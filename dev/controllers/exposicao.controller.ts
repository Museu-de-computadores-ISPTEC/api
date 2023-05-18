import _Controller_ from "../core/controller";
import { Request, Response } from "express";
import { Exposicao, ExposicaoSlide, ExposicaoSlideSub } from '../db/models/exposicao';
import {IFile, File} from '../classes/file';
import * as uuid from 'uuid';

export interface IExposicaoController{
    Exposicoes(req: Request, res: Response): Promise<any>;
    Exposicao(req: Request, res: Response): Promise<any>;
    ExposicaoRegistrar(req: Request, res: Response): Promise<any>;
    ExposicoesDeletar(req: Request, res: Response): Promise<any>;
    ExposicoesAtualizar(req: Request, res: Response): Promise<any>;
    Slides(req: Request, res: Response): Promise<any>;
    SlideRegistrar(req: Request, res: Response): Promise<any>;
    SlideDeletar(req: Request, res: Response): Promise<any>;
    SlideAtualizar(req: Request, res: Response): Promise<any>;
    SubSlides(req: Request, res: Response): Promise<any>;
    SubSlideRegistrar(req: Request, res: Response): Promise<any>;
    SubSlideDeletar(req: Request, res: Response): Promise<any>;
    SubSlideAtualizar(req: Request, res: Response): Promise<any>;
}

export class ExposicaoController extends _Controller_ implements IExposicaoController{

    constructor(private file: IFile){
        super();
    }

    ///////////////////// Exposição /////////////////////////////

    //Método Responsável por retornar uma lista de exposições
    //Método: GET
    //Rota: /exposicao
    public async Exposicoes(req: Request, res: Response): Promise<any>{
        try{
            let exposicoes = await Exposicao.findAll();
            return this.JsonResponse(res, exposicoes);
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

    //Método Responsável por retornar uma exposicao com base no id
    //Método: GET
    //Rota: /exposicao/:id
    public async Exposicao(req: Request, res: Response): Promise<any>{
        try{
            let exposicao: any = await Exposicao.findOne({
                where: {
                    id: req.params.id
                }
            });
            return this.JsonResponse(res, exposicao);
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

    //Método Responsável por registrar uma exposicao
    //Método: POST
    //Rota: /exposicao
    public async ExposicaoRegistrar(req: Request, res: Response): Promise<any>{
        try{
            //buscando uma exposicao com o mesmo titulo da exposicao a ser criada
            let exposicoes = await Exposicao.findOne({
                where: {
                    titulo: req.body.titulo
                }
            });

            //se existir uma exposicao com o mesmo titulo, retorna um { titulo: false }
            if(exposicoes != null){
                return this.JsonResponse(res, {titulo: false});
            }else{
                //se não existir uma exposicao com o mesmo titulo, cria a exposicao e retorna um { titulo: false, id: <id da exposicao> }
                let hash = uuid.v4(); //gera um uuid
                this.file.makeDir(`exposicoes/${hash}`);//creai uma pasta que irá conter todas as imagens desa exposição
                this.file.makeDir(`exposicoes/${hash}/slides`);// detro da pasta dessa exposiºão, cria uma para dos slides
                req.body.uuid = hash; //adicona o hash no corpo da requisição
                if(req.files){
                    req.body.image = await this.file.uploadImage(req.files.imagem, `exposicoes/${hash}`) // faz o uplado da imagem;
                }else{
                    req.body.image = null
                }
                let exposicao: any = await Exposicao.create(req.body); //registra a exposição
                return this.JsonResponse(res, {titulo: true, exposicao: exposicao}); //retorna a resposta
            }
        }catch(error){
            return this.ErrorResponse(res, error); //em caso de um erro acontecer retorna o erro a requisição
        }
    }

    //Método Responsável por deletar uma esposicao
    //Método: DELETE
    //Rota: /exposicao/:id
    public async ExposicoesDeletar(req: Request, res: Response): Promise<any>{
        try{
            let exposicao: any =  await Exposicao.findByPk(req.params.id, { //busca o uuid da exposição a ser excluida
                attributes: ['uuid']
            });

            if(exposicao != null){
                //caso a exposição existir existir
                await this.file.deleteDir(`exposicoes/${exposicao.uuid}`); //exclui o directório da a exposição
                await Exposicao.destroy({ //exclui a exposição do banco de dados
                    where: {
                        id: req.params.id
                    }
                });
            }
            return this.JsonResponse(res, {exposicao: true}); //responde a requisição
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

    //Método Responsável por atualizar os dados de uma exposicao
    //Método: PUT
    //Rota: /exposicao/:id
    public async ExposicoesAtualizar(req: Request, res: Response): Promise<any>{
        try{
             //se existir uma exposicao , atualiza os dados da exposicao e retorna um { exposicao: true}
             if(req.files){
                 let exposicao: any = await Exposicao.findByPk(req.params.id, { //busca o uuid e o nome da imagem 
                     attributes: ['uuid', 'image']
                 });
                 if(exposicao){ // se a exposição existir
                    await this.file.deleteImage(`exposicoes/${exposicao.uuid}/${exposicao.image}`); // deleta a imagem da expsição
                    req.body.image = await this.file.uploadImage(req.files.image, `exposicoes/${exposicao.uuid}`); //faz o upload da imagem da exposição e adiciona o nome do arquivo ao corpo da requisição
                }
            }
            await Exposicao.update(req.body, { //faz o a atualização no banco de dados
                where: {
                    id: req.params.id
                }
            });
            return this.JsonResponse(res, {exposicao: true}); // responde a requisição
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

    ///////////////////// Slides /////////////////////////////

    //Método Responsável por retornar todos os slides de uma exposicao
    //Método: GET
    //Rota: /exposicao/:id/slides
    public async Slides(req: Request, res: Response): Promise<any>{
        try{
            let slides = await ExposicaoSlide.findAll({
                where: {
                    id_exposicao: req.params.id
                },
            });
            return this.JsonResponse(res, {exposicao: true, slides: slides}); 
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

    //Método Responsável por registrar um slide
    //Método: POST
    //Rota: /exposicao/:id/slides
    public async SlideRegistrar(req: Request, res: Response): Promise<any>{
        try{
            let exposicao: any = await Exposicao.findByPk(req.params.id, {
                attributes: ['uuid']
            });
            if(exposicao){
                if(req.files){
                    req.body.image = await this.file.uploadImage(req.files.image, `exposicoes/${exposicao.uuid}/slides/`); //faz o upload da imagem ddo slide e adiciona o nome do arquivo ao corpo da requisição
                }
            }
            req.body.id_exposicao = req.params.id; // adiciona o id da exposição no corpo da requisição
            let slide = await ExposicaoSlide.create(req.body); //registra o slide
            return this.JsonResponse(res, slide);//respode a requisição
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

    //Método Responsável por deletar um slide
    //Método: DELETE
    //Rota: /exposicao/:id/slides/:slide
    public async SlideDeletar(req: Request, res: Response): Promise<any>{
        try{
            let exposicao: any = await Exposicao.findByPk(req.params.id, {
                attributes: ['uuid']
            });

            if(exposicao){
                let slide: any = await ExposicaoSlide.findByPk(req.params.slide , { attributes: ['image'] });
                if(slide != null && slide.image != null){
                    this.file.deleteImage(`exposicoes/${exposicao.uuid}/slides/${slide.image}`);
                }
            }
            await ExposicaoSlide.destroy({
                where: {
                    id: req.params.slide
                }
            })
            return this.JsonResponse(res, {slide: true});
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

    //Método Responsável atualizar os dados de um slide um slide
    //Método: PUT
    //Rota: /exposicao/:id/slides/:slide
    public async SlideAtualizar(req: Request, res: Response): Promise<any>{
        try{
            let exposicao: any = await Exposicao.findByPk(req.params.id, {
                attributes: ['uuid']
            });

            if(req.files){
                if(exposicao){
                    let slide: any = await ExposicaoSlide.findByPk(req.params.slide , { attributes: ['image'] });
                    req.body.image = await this.file.uploadImage(req.files.image, `exposicoes/${exposicao.uuid}/slides/`);
                    if(slide.image != null) this.file.deleteImage(`exposicoes/${exposicao.uuid}/slides/${slide.image}`);
                }
            }

            await ExposicaoSlide.update(req.body, {
                where: {
                    id: req.params.slide
                }
            })
            return this.JsonResponse(res, {slide: true});
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

    ///////////////////// sub Slides /////////////////////////////

     //Método Responsável por retornar todos os subslides de uma exposicao
    //Método: GET
    //Rota: /exposicao/:id/slides/:slide
    public async SubSlides(req: Request, res: Response): Promise<any>{
        try{
            let slides = await ExposicaoSlideSub.findAll({
                where: {
                    id_exposicao_slide: req.params.slide
                }
            });
            return this.JsonResponse(res, {exposicao: true, slide: true, subslides: slides}); 
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

    //Método Responsável por registrar um subslide
    //Método: POST
    //Rota: /exposicao/:id/slides/:slide
    public async SubSlideRegistrar(req: Request, res: Response): Promise<any>{
        try{
            let exposicao: any = await Exposicao.findByPk(req.params.id, {
                attributes: ['uuid']
            });
            if(exposicao){
                if(req.files){
                    req.body.image = await this.file.uploadImage(req.files.image, `exposicoes/${exposicao.uuid}/slides/`); //faz o upload da imagem ddo slide e adiciona o nome do arquivo ao corpo da requisição
                }
            }
            req.body.id_exposicao_slide = req.params.slide
            let slide = await ExposicaoSlideSub.create(req.body);
            return this.JsonResponse(res, slide);
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

    //Método Responsável por deletar um subslide
    //Método: DELETE
    //Rota: /exposicao/:id/slides/:slide/:subslide
    public async SubSlideDeletar(req: Request, res: Response): Promise<any>{
        try{
            let exposicao: any = await Exposicao.findByPk(req.params.id, {
                attributes: ['uuid']
            });
            if(exposicao){
                let slide: any = await ExposicaoSlideSub.findByPk(req.params.subslide , { attributes: ['image'] });
                if(slide != null && slide.image != null){
                    this.file.deleteImage(`exposicoes/${exposicao.uuid}/slides/${slide.image}`);
                }
            }
            await ExposicaoSlideSub.destroy({
                where: {
                    id: req.params.subslide
                }
            })
            return this.JsonResponse(res, {subslide: true});
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

     //Método Responsável atualizar os dados de um subslied
    //Método: PUT
    //Rota: /exposicao/:id/slides/:slide/:subslide
    public async SubSlideAtualizar(req: Request, res: Response): Promise<any>{
        try{
            let exposicao: any = await Exposicao.findByPk(req.params.id, {
                attributes: ['uuid']
            });

            if(req.files){
                if(exposicao){
                    let slide: any = await ExposicaoSlideSub.findByPk(req.params.subslide , { attributes: ['image'] });
                    req.body.image = await this.file.uploadImage(req.files.image, `exposicoes/${exposicao.uuid}/slides/`);
                    if(slide.image != null) this.file.deleteImage(`exposicoes/${exposicao.uuid}/slides/${slide.image}`);
                }
            }
            await ExposicaoSlideSub.update(req.body, {
                where: {
                    id: req.params.subslide
                }
            });
            return this.JsonResponse(res, {subslide: true});
        }catch(error){
            return this.ErrorResponse(res, error);
        }
    }

}