import express from 'express';
import cors from 'cors';
import HomeRouter from './routers/home.router';
import NotFound from './middlewares/not-found.middleware';
import ErrorHandler from './middlewares/error.middleware';

const PORT: number = 3000;
let app = express();
app.use(cors());
app.use(express.json());

app.get("/", HomeRouter);
app.use(NotFound);
app.use(ErrorHandler);

app.listen(3000, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
});