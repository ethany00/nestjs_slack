import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

// 비즈니스 로직
@Injectable()
export class AppService {

  constructor(private readonly configService: ConfigService) {}

  async getHello() {
    // return process.env.SECRET;
    // nest가 모든것을 관리 하게끔 conf권한 마저도 넘겨버린다
    return this.configService.get('DB_PASSWORD');
  }

}
