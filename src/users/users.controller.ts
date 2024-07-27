import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import { JoinRequestDto } from "./dto/join.request.dto";
import {UsersService} from "./users.service";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserDto} from "../common/dto/user.dto";

@ApiTags('USER')
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiResponse({
        type: UserDto
    })
    // 스웨거를 위한 설명
    @ApiOperation({summary:'내 정보 조회'})
    @Get()
    getUsers(@Req() req) {
        return req.user;
    }
    @ApiOperation({summary:'회원가입'})
    @Post()
    postUser(@Body() data:JoinRequestDto) {
        this.usersService.postUsers(data.email,data.nickname,data.password);
    }

    // @ApiOkResponse 알아서 200을 res
    @ApiResponse({
        status:200,
        description:'성공',
        type: UserDto
    })
    // 응답 늘려줄 수 있음
    @ApiResponse({
        status:500,
        description:'서버 에러',
    })
    @Post('login')
    logIn(@Req() req) {
        return req.user;
    }

    @Post('logout')
    logOut(@Req() req, @Req() res) {
        req.logOut();
        res.clearCookie('connect.sid',{httpOnly:true});
        res.send('ok');
    }
}
