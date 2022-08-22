import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLogin } from 'src/models/auth/login';
import { RefreshToken } from 'src/models/auth/refresh-token';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private _authService:AuthService){}
    @Post('/authenticate')
    async authenticate(@Body() body:UserLogin){   
        return await this._authService.authenticate(body);
    }
    @Post('/refresh-token')
    async refreshToken(@Body() body:RefreshToken){   
        return await this._authService.refreshToken(body.refresh_token);
    }
}
