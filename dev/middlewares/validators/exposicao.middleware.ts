/**
 * Arquivo middlewares de validação de requisições de exposicoes
 * 
 */

import { NextFunction, Request, Response } from "express";
import { body, param, query } from "express-validator";
import ErrorValidator from "../error-vaidatdor.middleware";
import { Exposicao, ExposicaoSlide, ExposicaoSlideSub } from '../../db/models/exposicao';

let validators = {
    id_obrigatorio: param('id').notEmpty().withMessage("o id é obrigatório"),
    id_valido: param('id').isInt({min: 1}).withMessage("o id tem que ser inteiro e maior ou igual a 1"),
    slide_obrigatorio: param('slide').notEmpty().withMessage("o slide é obrigatório"),
    slide_valido: param('slide').isInt({min: 1}).withMessage("o slide tem que ser inteiro e maior ou igual a 1"),
    subslide_obrigatorio: param('slide').notEmpty().withMessage("o slide é obrigatório"),
    subslide_valido: param('slide').isInt({min: 1}).withMessage("o slide tem que ser inteiro e maior ou igual a 1"),

    titulo: body('titulo').notEmpty().withMessage("o titulo é obrigatório"),
    descricao: body('descricao').notEmpty().withMessage("a descricao é obrigatória"),
    conteudo: body('conteudo').notEmpty().withMessage("o conteudoé obrigatório"),

    posicao: body('posicao').isInt({min: 1}).withMessage("a posição do slide tem que ser inteiro e maior ou igual a 1"),
    existe_exposicao:  async (req: Request, res: Response, next: NextFunction)=>{
        let exposicao = await Exposicao.findByPk(req.params.id);
        if(exposicao == null){
            return res.json({exposicao: false});
        }
        return next();
    },
    existe_slide:  async (req: Request, res: Response, next: NextFunction)=>{
        let slide = await ExposicaoSlide.findByPk(req.params.slide);
        if(slide == null){
            return res.json({slide: false});
        }
        return next();
    },
    existe_subslide:  async (req: Request, res: Response, next: NextFunction)=>{
        let slide = await ExposicaoSlideSub.findByPk(req.params.subslide);
        if(slide == null){
            return res.json({subslide: false});
        }
        return next();
    },
}

//Middlewares para verificação dos parametros do id da exposição e verificar a existência do id
export let exposicao = [
    validators.id_obrigatorio,
    validators.id_valido,
    ErrorValidator,
    validators.existe_exposicao
];

//Middlewares para verificação do corpo da rota POST::/exposicao/
export let exposicao_registrar = [
    validators.titulo,
    validators.descricao,
    ErrorValidator
];

//Middlewares para verificar a existênca da exposição
export let existe_exposicao = [
   validators.existe_exposicao
];

//Middlewares para a rota POST::/exposicao/:id/slides

export let slide_registrar = [
    validators.titulo,
    validators.conteudo,
    validators.posicao,
    validators.id_obrigatorio,
    validators.id_valido,
    ErrorValidator,
    validators.existe_exposicao
]

//Middlewares para a rota DELETE::/exposicao/:id/slides/:slide
export let slide_deletar = [
    validators.id_obrigatorio,
    validators.id_valido,
    validators.slide_obrigatorio,
    validators.slide_valido,
    ErrorValidator,
    validators.existe_exposicao,
    validators.existe_slide,
];

//Middlewares para a rota PUT::/exposicao/:id/slides/:slide
export let slide_atualizar = [
    validators.id_obrigatorio,
    validators.id_valido,
    validators.slide_obrigatorio,
    validators.slide_valido,
    ErrorValidator,
    validators.existe_exposicao,
    validators.existe_slide,
];

///////////////// Sub-slides ///////////////////////

//Middlewares para a rota GET::/exposicao/:id/slides/:slide
export let sub_slides = [
    validators.id_obrigatorio,
    validators.id_valido,
    validators.slide_obrigatorio,
    validators.slide_valido,
    ErrorValidator,
    validators.existe_exposicao,
    validators.existe_slide,
]

//Middlewares para a rota POST::/exposicao/:id/slides/:slide
export let sub_slide_registrar = [
    validators.id_obrigatorio,
    validators.id_valido,
    validators.slide_obrigatorio,
    validators.slide_valido,
    validators.subslide_obrigatorio,
    validators.subslide_valido,
    validators.titulo,
    validators.conteudo,
    validators.posicao,
    ErrorValidator,
    validators.existe_exposicao,
    validators.existe_slide,
];

export let sub_slide_deletar = [
    validators.id_obrigatorio,
    validators.id_valido,
    validators.slide_obrigatorio,
    validators.slide_valido,
    validators.subslide_obrigatorio,
    validators.subslide_valido,
    ErrorValidator,
    validators.existe_exposicao,
    validators.existe_slide,
    validators.existe_subslide,
];

export let sub_slide_atualizar = [
    validators.id_obrigatorio,
    validators.id_valido,
    validators.slide_obrigatorio,
    validators.slide_valido,
    validators.subslide_obrigatorio,
    validators.subslide_valido,
    ErrorValidator,
    validators.existe_exposicao,
    validators.existe_slide,
    validators.existe_subslide,
];

