export interface Route {
    method: string;
    url: string;
    function: any;
    middleware?: any;
}