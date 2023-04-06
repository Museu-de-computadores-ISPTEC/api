import _Router_ from "../core/router";
import ExposicaoController from "../controllers/exposicao.controller";
import { exposicao_id, exposicao_registrar } from '../middlewares/validators/exposicao.middleware'


class ExposicaoRouter extends _Router_{
    constructor(public exposicaoCtrl: ExposicaoController = new ExposicaoController){
        super();
        this.SetRoutes([
            {method: 'get', url: '/', function: this.exposicaoCtrl.Exposicoes},
            {method: 'get', url: '/:id', function: this.exposicaoCtrl.Exposicao, middleware: exposicao_id},
            {method: 'post', url: '/', function: this.exposicaoCtrl.ExposicaoRegistrar, middleware: exposicao_registrar},
            {method: 'delete', url: '/:id', function: this.exposicaoCtrl.ExposicoesDeletar, middleware: exposicao_id},
            {method: 'put', url: '/:id', function: this.exposicaoCtrl.ExposicoesAtualizar, middleware: exposicao_id},
        ], []);

        this.MakeRoutes();
    }
}

export default new ExposicaoRouter(new ExposicaoController).GetRoutes();