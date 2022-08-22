import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PermissionService } from '../permission/permission.service';

@Module({
  providers: [AuthService,JwtService,PermissionService],
  controllers: [AuthController]
})
export class AuthModule {}
