import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

import express from 'express';
import cors from 'cors';
import margan from 'morgan';

import HomeRouter from './routers/home.router';
import ExposicaoRouter from './routers/exposicao.router';
import NotFound from './middlewares/not-found.middleware';
import ErrorHandler from './middlewares/error.middleware';

const PORT: number = 3000;

let app = express();

app.use(margan('dev'));
app.use(cors());
app.use(express.json());

app.use("/", HomeRouter);
app.use("/exposicao", ExposicaoRouter);
app.use(NotFound);
app.use(ErrorHandler);

app.listen(3000, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
});