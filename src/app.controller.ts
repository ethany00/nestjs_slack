import {Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

// req,res
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

}
