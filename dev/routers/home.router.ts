import _Router_ from "../core/router";
import HomeController from "../controllers/home.controller";
import Console from "../middlewares/console.middleware";

class HomeRouter extends _Router_{
    constructor(public homeCtrl: HomeController = new HomeController){
        super();
        this.SetRoutes([
            {method: 'get', url: '/', function: this.homeCtrl.Home},
            {method: 'get', url: '/sobre', function: this.homeCtrl.Sobre},
        ], []);

        this.MakeRoutes();
    }
}

export default new HomeRouter(new HomeController).GetRoutes();