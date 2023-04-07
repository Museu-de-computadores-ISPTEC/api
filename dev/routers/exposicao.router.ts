import _Router_ from "../core/router";
import ExposicaoController from "../controllers/exposicao.controller";
import { exposicao, exposicao_registrar, slide_atualizar, slide_deletar, slide_registrar,  sub_slide_atualizar, sub_slide_deletar, sub_slide_registrar, sub_slides} from '../middlewares/validators/exposicao.middleware'


class ExposicaoRouter extends _Router_{
    constructor(public exposicaoCtrl: ExposicaoController = new ExposicaoController){
        super();
        this.SetRoutes([
            /////////////Exposições
            {method: 'get', url: '/', function: this.exposicaoCtrl.Exposicoes},
            {method: 'get', url: '/:id', function: this.exposicaoCtrl.Exposicao, middleware: exposicao},
            {method: 'post', url: '/', function: this.exposicaoCtrl.ExposicaoRegistrar, middleware: exposicao_registrar},
            {method: 'delete', url: '/:id', function: this.exposicaoCtrl.ExposicoesDeletar, middleware: exposicao},
            {method: 'put', url: '/:id', function: this.exposicaoCtrl.ExposicoesAtualizar, middleware: exposicao},
            /////////////slides
            {method: 'get', url: '/:id/slides', function: this.exposicaoCtrl.Slides, middleware: exposicao},
            {method: 'post', url: '/:id/slides', function: this.exposicaoCtrl.SlideRegistrar, middleware: slide_registrar},
            {method: 'delete', url: '/:id/slides/:slide', function: this.exposicaoCtrl.SlideDeletar, middleware: slide_deletar},
            {method: 'put', url: '/:id/slides/:slide', function: this.exposicaoCtrl.SlideAtualizar, middleware: slide_atualizar},
            /////////////subslides
            {method: 'get', url: '/:id/slides/:slide', function: this.exposicaoCtrl.SubSlides, middleware: sub_slides},
            {method: 'post', url: '/:id/slides/:slide', function: this.exposicaoCtrl.SubSlideRegistrar, middleware: sub_slide_registrar},
            {method: 'delete', url: '/:id/slides/:slide/:subslide', function: this.exposicaoCtrl.SubSlideDeletar, middleware: sub_slide_deletar},
            {method: 'put', url: '/:id/slides/:slide/:subslide', function: this.exposicaoCtrl.SubSlideAtualizar, middleware: sub_slide_atualizar},
        ], []);

        this.MakeRoutes();
    }
}

export default new ExposicaoRouter(new ExposicaoController).GetRoutes();