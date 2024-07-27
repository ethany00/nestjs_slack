import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";

// 그룹핑명
@ApiTags('DM')
// @ts-ignore
@Controller('api/workspaces/:url/dms')
export class DmsController {

    @ApiParam({
        name:'url',
        required:true,
        description:'워크스페이스 url',
    })

    @ApiParam({
        name:'id',
        required:true,
        description:'사용자 id',
    })

    @ApiQuery({
        name:'perPage',
        required:true,
        description:'한 번에 가져오는 개수',
    })

    @ApiQuery({
        name:'page',
        required:true,
        description:'불러올 페이지',
    })

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
