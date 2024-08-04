import {Body, Controller, Get, Post, Req, UseInterceptors} from '@nestjs/common';
import { JoinRequestDto } from "./dto/join.request.dto";
import {UsersService} from "./users.service";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserDto} from "../common/dto/user.dto";
import {User} from "../common/decorator/user.decorator";
import {UndefinedToNullInterceptor} from "../common/interceptor/undefinedToNull.interceptor";

// 개별로도 적용가능
// 컨트롤러 리턴값이 undefined 일경우~ 인터셉트안에 로직을 따름
@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // resource 명령어로 crud 한방에 처리가능 nest g resource

    @ApiResponse({
        type: UserDto
    })
    // 스웨거를 위한 설명
    @ApiOperation({summary:'내 정보 조회'})
    @Get()
    // 데코레이터 형식으로 변환
    getUsers(@User() user) {
        return user;
        // res.locals.jwt
    }
    @ApiOperation({summary:'회원가입'})
    @Post()
    join(@Body() data:JoinRequestDto) {
        this.usersService.join(data.email,data.nickname,data.password);
        return undefined;
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
        description:'서버 에러!',
    })
    @Post('login')
    logIn(@User() user) {
        return user;
    }

    @Post('logout')
    logOut(@Req() req, @Req() res) {
        req.logOut();
        res.clearCookie('connect.sid',{httpOnly:true});
        res.send('ok');
    }
}
