import {Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('abc')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello') // abc/hello
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('hello') // abc/hi
  postHello(): string{
    return this.appService.getHello();
  }
}
