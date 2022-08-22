import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export class ConfigService {
    constructor(){
        dotenv.config()
    }
    public get(key: string): string {
        return process.env[key];
    }
    public getNumber(key: string): number {
        return Number(this.get(key));
    }
    get typeOrmConfig(): TypeOrmModuleOptions {
        return {
            keepConnectionAlive: true,
            type: 'mysql',
            host: this.get('MYSQL_HOST'),
            port: this.getNumber('MYSQL_PORT'),
            username: this.get('MYSQL_USERNAME'),
            // password: this.get('MYSQL_PASSWORD'),
            database: this.get('MYSQL_DATABASE'),
            synchronize: false,
            logging: true,
            timezone:'Z'
        };
    }
}