import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserQueryParams } from 'src/models/user/user.params';
import { QueryService } from 'src/services/query.service';
import { Cache } from 'cache-manager';
import { UserRegister } from 'src/models/user/user-register';
// import { client } from 'src/main';
@Injectable()
export class UserService {
    constructor(private _queryService:QueryService,@Inject(CACHE_MANAGER) private cacheManager: Cache){}
    async getAllUsers(params:UserQueryParams){
        // let cache_data : any = await client.lRange('getalluser',0,-1);
        // if(cache_data.length){
        //     return JSON.parse(cache_data[0]);
        // }
        // else{
            let query = "call sp_get_all_users(?)";
            let result = await this._queryService.select(query,[[...params.getParams]],true);
            // client.lPush('getalluser',JSON.stringify(result));
            return result;
        // }
        
    }
    async getUserDetail(userId:number){
        let query = "call sp_get_user_detail(?)";
        return await this._queryService.selectSingle(query,[[userId]],true);
    }
    async register(body:UserRegister){
        let query = "insert into users (name, email, password, phone) values(?)";
        let result = await this._queryService.insertUpdateDelete(query,[[body.name,body.email,body.password,body.phone]]);
        return result

    }
}
