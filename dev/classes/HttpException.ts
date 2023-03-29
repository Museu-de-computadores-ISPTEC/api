export default class HttpException extends Error{
    public statusCode?: number;
    public status?: number;
    public message: string;
    public error: string | null;
    
    constructor(stausCode: number, message: string, error?: string){
        super(message);
        this.statusCode = stausCode;
        this.message = message;
        this.error = error || null;
    }
}