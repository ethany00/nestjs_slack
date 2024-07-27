import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppService } from './app.service';
import {LoggerMiddleware} from "./middlewares/logger.middleware";
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';

// 외부에서 env불러들일 수 있음 보안안전
const getEnv = async ()=>{
  // const response = await axios.get('~');
  // return response.data;
  return{
    DB_PASSWORD:'1111',
    NAME:'ethan',
  }
}

@Module({
  // load -> getEnv 함수생성해서 사용
  // imports: [ConfigModule.forRoot({isGlobal: true, load :[getEnv]}),],
  imports: [ConfigModule.forRoot(), UsersModule, WorkspacesModule, ChannelsModule, DmsModule,],
  controllers: [AppController],
  providers: [AppService,ConfigService],
})
export class AppModule implements NestModule{
  // 라우트 전체에 로거 적용
  // 미들웨어들은 컨슈머에 연결한다
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}