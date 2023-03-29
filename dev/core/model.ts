/*
import mysql from 'mysql';
import { ConnectionConfig } from 'mysql';

let config: any = require('../config.json');


export default abstract class _Model_ {
    private options: ConnectionConfig;
    private connection: any;

    constructor() {
        this.options = config.database_options;
        this.connection = mysql.createConnection(this.options);

        this.connection.connect((err: any) => {
            if (err) {
                throw err
            }
        });
    }

    protected Query(sql: string, arr: Array<any> = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, arr, (err: any, data: any, fields: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            });
        });
    }
}
*/