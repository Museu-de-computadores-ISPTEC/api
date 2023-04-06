/**
 * Arquivo middlewares de validação de requisições de exposicoes
 * 
 */

import { NextFunction, Request, Response } from "express";
import { body, param, query } from "express-validator";

//Middlewares para verificação do parametro id da rota GET::/exposicao/:id
export let exposicao_id = [
    param('id').notEmpty().withMessage("o id da exposicao é obrigatório"),
    param('id').isInt({min: 1}).withMessage("o id do usuario tem que ser inteiro e maior ou igual a 1"),
];

//Middlewares para verificação do corpo da rota POST::/exposicao/
export let exposicao_registrar = [
    body('titulo').notEmpty().withMessage("o titulo da exposicao é obrigatório"),
    body('descricao').notEmpty().withMessage("a descricao da exposicao é obrigatória"),
    body('img_capa').notEmpty().withMessage("a imagem de capa da exposicao é obrigatória"),
];