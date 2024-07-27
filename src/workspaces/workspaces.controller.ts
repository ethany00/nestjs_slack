import {Controller, Delete, Get, Post, Res} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
    @Get()
    getWorkspaces() {}

    @Post()
    createWorkspaces(){}

    @Get(':url/membsers')
    getAllMembersFromWorkspace(){}

    @Post(':url/membsers')
    inviteMembersToWorkspace(){}

    @Delete(':url/membsers/:id')
    kickMembersToWorkspace(){}

    @Get(':url/users/:id')
    getMembersInfoInWorkspace(){}

    // api 잘못생성시 추후에 없애야할 매서드
    @Get(':url/users/:id')
    DEPRECATED_getMembersInfoInWorkspace(){
        this.getMembersInfoInWorkspace();
    }



}
