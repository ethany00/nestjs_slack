import {Body, Controller, Get, Post, Req} from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getUsers(@Req() req) {
        return req.user;
    }
    @Post()
    postUser() {

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
