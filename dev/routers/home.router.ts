import _Router_ from "../core/router";
import a from "../controllers/home.controller";

class HomeRouter extends _Router_{
    constructor(public homeCtrl: any){
        super();
        this.SetRoutes([
            {method: 'get', url: '/', function: this.homeCtrl.Home.bind(homeCtrl)},
            {method: 'get', url: '/sobre', function: this.homeCtrl.Sobre},
        ], []);

        this.MakeRoutes();
    }
}

export default new HomeRouter(a).GetRoutes();