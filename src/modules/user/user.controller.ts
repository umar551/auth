import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { permission } from 'src/decorators/permission.decorator';
import { PermissionEnum } from 'src/enums/permission.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { UserRegister } from 'src/models/user/user-register';
import { UserQueryParams } from 'src/models/user/user.params';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('users')
@UseGuards(JwtAuthGuard,RolesGuard)
@ApiBearerAuth()
export class UserController {
    constructor(private _userService:UserService){}
    @permission(PermissionEnum.GET_ALL_USER)
    @Get('/get-all-users')
    async getAllUsers(@Req() req){
        const userParams = new UserQueryParams(req.query)
        return await this._userService.getAllUsers(userParams);
    }
    @Get('/get-user-detail')
    @permission(PermissionEnum.USER_DETAIL)
    async getUserDetail(@Req() req){
        return await this._userService.getUserDetail(req.user.userId);
    }
    @Post('/register')
    @permission(PermissionEnum.USER_REGISTER)
    async register(@Body() body:UserRegister){
        return this._userService.register(body);
    }
}
