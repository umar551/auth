import { CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpInterceptor } from './interceptors/http.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionModule } from './modules/permission/permission.module';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from './services/config.service';
import { SharedModule } from './shared/shared.module';

const modules = [
  AuthModule,
  UserModule,
  SharedModule,
  PermissionModule,
  TypeOrmModule.forRootAsync({
    imports: [SharedModule],
    useFactory: (configService: ConfigService) =>
      configService.typeOrmConfig,
    inject: [ConfigService],
  }),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get("JWT_SECRET_KEY"),
      signOptions: { expiresIn: configService.get('JWT_EXPIRE') }
    }),
  })
]
@Module({
  imports: [...modules],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_INTERCEPTOR,
    useClass: HttpInterceptor,
  }],
})
export class AppModule {}
