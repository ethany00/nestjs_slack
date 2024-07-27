import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {


    @Get()
    getAllChannels() {

    }
    @Post()
    createChannels() {

    }

    @Get(':name')
    getSpecificChannel(){

    }

    @Get(':name/chats')
    getChats(@Query() query, @Param() param) {
        console.log(query);
        console.log(param.id,param.url);
    }

    @Post(':name/chats')
    postChats(@Body() body) {}

    @Get(':name/members')
    getAllMembers(){

    }

    @Get(':name/members')
    inviteMembers(){

    }

}
