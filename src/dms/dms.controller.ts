import {Body, Controller, Get, Param, Post, Query, Res} from '@nestjs/common';

@Controller('api/workspaces/:url/dms')
export class DmsController {
    @Get(':id/chats')
    // 개별적으로 인자받기
    //getChats(@Query('perPage') perPage,@Query('page') page) {
    // 전부받기
    getChats(@Query() query, @Param() param) {
        // console.log(perPage,page);
        console.log(query);
        // 파람 부분도 추출가능
        console.log(param.id,param.url);
    }

    @Post(':id/chats')
    postChats(@Body() body) {}
}
