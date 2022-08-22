import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { permission } from 'src/decorators/permission.decorator';
import { PermissionEnum } from 'src/enums/permission.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { CreateRolePermission } from 'src/models/permission/create-role-permission';
import { PermissionService } from './permission.service';

@Controller('permission')
@ApiTags('permission')
@UseGuards(JwtAuthGuard,RolesGuard)

@ApiBearerAuth()
export class PermissionController {
    constructor(private _permissionService:PermissionService){}
    @permission(PermissionEnum.PERMISSION_CREATE)
    @Post('/create-permission')
    async createRolePermission(@Body() body:CreateRolePermission){
        return await this._permissionService.createRolePermission(body);
    }
    @permission(PermissionEnum.PERMISSION_READ)
    @Get('/get-permission')
    async getPermission(@Req() req){
        return await this._permissionService.getPermission(req.user.userId); 
    }
}
