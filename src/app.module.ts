import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppService } from './app.service';
import {LoggerMiddleware} from "./middlewares/logger.middleware";
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "node:process";
import {ChannelChats} from "./entities/ChannelChats";
import {Users} from "./entities/Users";

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
  imports: [
      ConfigModule.forRoot(),
      UsersModule,
      WorkspacesModule,
      ChannelsModule,
      DmsModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities:true, // forFeature 안에 읽어서 로드함 버그 있으면 아래 코드로..
        // entities: ['entities/*.js'],
        // entities: [ChannelChats], 하나씩 넣어줘도 된다
        // 직접 엔티티를 만들고 싱크할때 true 이후 한번 생성된 후에는 false 처리로 해야 안전
        synchronize: false,
        // typeorm 쿼리로깅 에러가 종종 있다
        logging:true,
        // 서버 재시작시에 typeorm 디비연결 끊어지지 않게 하기위해서 ( 핫리로딩을 위해 )
        keepConnectionAlive:true,
        // 이모티콘을 위한
        charset: 'utf8mb4',
      }),
      TypeOrmModule.forFeature([Users])
  ],
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