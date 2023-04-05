import { Options, Sequelize, } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({path: '../../../.env'});
const env = process.env.NODE_ENV || 'development';

let config: any = {
    database: process.env.DB_DEV,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    dialect: 'mysql' || process.env.DB_DIALECT,
    logging: true,
}


const connection = new Sequelize(config.database, config.username, config.password, config);

export default connection;