import * as fs from 'fs';

export function Upload(file: any): Promise < any > {
    return new Promise((resolve, reject) => {

        let name: string = file.name;
        let size: number = file.size;
        let type: string = file.mimetype;
        file.mv('./public/imagens/' + name, (err: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(name);
            }
        });
    });
}

export function Delete(file: string): Promise < any > {
    return new Promise((resolve, reject) => {
        fs.unlink('./public/imagens/'+ file, (err)=>{
            if (err) {
                reject(err);
            } else {
                resolve(true)

            }
        } );
    });
}