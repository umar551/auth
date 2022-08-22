import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Redirect('/api')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
