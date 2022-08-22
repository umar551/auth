import { HttpStatus, Injectable } from '@nestjs/common';
import { UserLogin } from 'src/models/auth/login';
import { QueryService } from 'src/services/query.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/services/config.service';
import * as moment from 'moment';
import { PermissionService } from '../permission/permission.service';
@Injectable()
export class AuthService {
    constructor(private _queryService:QueryService,
                private _jwtService:JwtService,
                private _configService:ConfigService,
                private _permissionService:PermissionService
                ){}
    async authenticate(body:UserLogin){
        let userInfo = await this.checkUser(body);
        if (typeof userInfo == 'string') return userInfo;
        return await this.generateToken(userInfo);

    }
    async checkUser(body:UserLogin){
        let query = "select id as userId,password from users where email = ? and isDeleted is not true";
        let result = await this._queryService.selectSingle(query,[[body.email]],false);
        if(result){
            let password = bcrypt.compareSync(body.password,result.password);
            if(!password) return "Invalid Credentials";
            query = "call sp_get_user_detail(?)";
            result = await this._queryService.selectSingle(query,[[result.userId]],true);
            return result;
        }
        return "Invalid Credentials";
    }
    async generateToken(userInfo:any){
        let access_token = await this.generateAccessToken(userInfo);
        let refresh_token = await this.generateRefreshToken(userInfo);
        return {
            access_token : access_token,
            refresh_token : refresh_token,
            user : userInfo
        }
    }
    async generateAccessToken(userInfo:any){
        let permissions = await this._permissionService.getPermission(userInfo.userId);
        let payload = {
            userId : userInfo.userId,
            roleId : userInfo.roleId,
            permissions : permissions
        }
        let access_token = this._jwtService.sign(payload,{
            secret: this._configService.get("JWT_SECRET_KEY"),
            expiresIn: this._configService.get('JWT_EXPIRE')
        })
        return access_token;
    }
    async generateRefreshToken(userInfo:any){
        let refreshToken = bcrypt.hashSync(this._configService.get("JWT_SECRET_KEY"));
        let expiresIn :any= moment.duration(moment.now()).add('30','minute');
        expiresIn = new Date(expiresIn).getTime();
        let query = "update users set refreshToken = ? , tokenExpire = ? where id = ?";
        let result = await this._queryService.selectSingle(query,[refreshToken,expiresIn,userInfo.userId],false);
        query = "select refreshToken from users where id = ?";
        result = await this._queryService.selectSingle(query,[[userInfo.userId]],false);
        return result.refreshToken;
    }
    async refreshToken(refresh_token:string){
        let query ="select id as userId,tokenExpire from users where refreshToken = ? ";
        let data = await this._queryService.selectSingle(query,[[refresh_token]],false);
        if(data.tokenExpire<=new Date().getTime()){
            let access_token = await this.generateAccessToken(data);
            return {
                access_token:access_token
            }
        }
        return HttpStatus.UNAUTHORIZED;
    }
}
