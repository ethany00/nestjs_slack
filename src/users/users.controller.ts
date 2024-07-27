import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import { JoinRequestDto } from "./dto/join.request.dto";
import {UsersService} from "./users.service";

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    getUsers(@Req() req) {
        return req.user;
    }
    @Post()
    postUser(@Body() data:JoinRequestDto) {
        this.usersService.postUsers(data.email,data.nickname,data.password);
    }

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
