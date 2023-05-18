import _Router_ from "../core/router";
import {ExposicaoController, IExposicaoController} from "../controllers/exposicao.controller";
import { exposicao, exposicao_registrar, slide_atualizar, slide_deletar, slide_registrar,  sub_slide_atualizar, sub_slide_deletar, sub_slide_registrar, sub_slides} from '../middlewares/validators/exposicao.middleware'
import {IFile, File} from '../classes/file';

class ExposicaoRouter extends _Router_{
    constructor(public exposicaoCtrl: IExposicaoController){
        super();
        this.SetRoutes([
            /////////////Exposições
            {method: 'get', url: '/', function: this.exposicaoCtrl.Exposicoes.bind(exposicaoCtrl)},
            {method: 'get', url: '/:id', function: this.exposicaoCtrl.Exposicao.bind(exposicaoCtrl), middleware: exposicao},
            {method: 'post', url: '/', function: this.exposicaoCtrl.ExposicaoRegistrar.bind(exposicaoCtrl), middleware: exposicao_registrar},
            {method: 'delete', url: '/:id', function: this.exposicaoCtrl.ExposicoesDeletar.bind(exposicaoCtrl), middleware: exposicao},
            {method: 'put', url: '/:id', function: this.exposicaoCtrl.ExposicoesAtualizar.bind(exposicaoCtrl), middleware: exposicao},
            /////////////slides
            {method: 'get', url: '/:id/slides', function: this.exposicaoCtrl.Slides.bind(exposicaoCtrl), middleware: exposicao},
            {method: 'post', url: '/:id/slides', function: this.exposicaoCtrl.SlideRegistrar.bind(exposicaoCtrl), middleware: slide_registrar},
            {method: 'delete', url: '/:id/slides/:slide', function: this.exposicaoCtrl.SlideDeletar.bind(exposicaoCtrl), middleware: slide_deletar},
            {method: 'put', url: '/:id/slides/:slide', function: this.exposicaoCtrl.SlideAtualizar.bind(exposicaoCtrl), middleware: slide_atualizar},
            /////////////subslides
            {method: 'get', url: '/:id/slides/:slide', function: this.exposicaoCtrl.SubSlides.bind(exposicaoCtrl), middleware: sub_slides},
            {method: 'post', url: '/:id/slides/:slide', function: this.exposicaoCtrl.SubSlideRegistrar.bind(exposicaoCtrl), middleware: sub_slide_registrar},
            {method: 'delete', url: '/:id/slides/:slide/:subslide', function: this.exposicaoCtrl.SubSlideDeletar.bind(exposicaoCtrl), middleware: sub_slide_deletar},
            {method: 'put', url: '/:id/slides/:slide/:subslide', function: this.exposicaoCtrl.SubSlideAtualizar.bind(exposicaoCtrl), middleware: sub_slide_atualizar},
        ], []);

        this.MakeRoutes();
    }
}

export default new ExposicaoRouter(new ExposicaoController(new File)).GetRoutes();