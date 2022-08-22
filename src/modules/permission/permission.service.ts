import { Injectable } from '@nestjs/common';
import { CreateRolePermission } from 'src/models/permission/create-role-permission';
import { QueryService } from 'src/services/query.service';

@Injectable()
export class PermissionService {
    constructor(private _queryService:QueryService){}
    async createRolePermission(body:CreateRolePermission){
        return await this.addPermission(body);
    }
    async getPermission(userId:number){
        let query = "call sp_get_permission(?)"
        return await this._queryService.select(query,[[userId]],true);
    }
    async addPermission(body:CreateRolePermission){
        let query = "call sp_create_role_permission(?)";
        let promises = [];
        for(let i=0;i<body.permissions.length;i++){
            let data = await this._queryService.insertUpdateDelete(query,[[body.roleId,body.roleName,body.permissions[i].permissionId,body.permissions[i].permissionName,body.permissions[i].permissionDescription]]);
            promises.push(data);
        }
        await Promise.all(promises);
        return "Roles & Permission Added Successfully";
    }
}
