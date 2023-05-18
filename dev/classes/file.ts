import * as fs from 'fs';
import * as path from 'path';

export interface IFile{
    makeDir(name: string): Promise<any>;
    uploadImage(file: any, caminho: string): Promise<any>;
    deleteImage(image: string): Promise<any>;
    deleteDir(name: string): Promise<any>;
}

export class File implements IFile{

    makeDir(name: string): Promise<any>{
        let dir: string = path.resolve('../', 'static', name);
        return new Promise((resolve, reject)=>{
            fs.access(dir, (error)=>{
                if(!error) reject(error);
                else{
                    fs.mkdir((dir), {recursive: true},  (err)=>{
                        if(err) reject(err);
                        resolve(dir);
                    });
                }
            });
        });
    }

    // Deleta um directório
    deleteDir(name: string): Promise<any>{
        let dir: string = path.resolve('../', 'static', name); //reolve o nome do directório dos aruivos estáticos
        return new Promise((resolve, reject)=>{// retorna uma promessa 
            fs.access(dir, (error)=>{ //tenta assesar uma pasta
                if(!error) reject(error); //se a pasta nãpo exitir, retorna o motivo
                else{
                    fs.rmdir(dir, (err)=>{//deleta o diretório
                        if(err) reject(err) //em caso de erro rejeita a promise 
                        resolve(true); // retorna true quando o directório estiver removido
                    })
                }
            })
        })
    }

    uploadImage(file: any, caminho: string): Promise<any>{
        let dir: string = path.resolve('../', 'static', caminho);
        return new Promise((resolve, reject) => {

            let name: string = file.name;
            let size: number = file.size;
            let type: string = file.mimetype;
            file.mv(dir + name, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(name);
                }
            });
        });
    }

    deleteImage(image: string): Promise<any>{
        let dir: string = path.resolve('../', 'static', image);
        return new Promise((resolve, reject) => {
            fs.unlink(image, (err)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            } );
        });
    }
}
