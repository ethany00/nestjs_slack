import {BadRequestException, HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "../entities/Users";
import {Repository} from "typeorm";
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) {}
    // async 안에서는 에러가 경고로뜬다 ( 에러가 삼켜짐 )
    getUser(){}
    async join(email: string, password: string,nickname: string) {
        // Users에서 class-validator를 이용해서 사용안해도된다.
        // if(!email){
        //     throw new HttpException('이메일이 존재하지 않습니다.',400);
        // }
        // if(!nickname){
        //     throw new HttpException('닉네임이 존재하지 않습니다.',400);
        //     // throw new BadRequestException('닉네임이 존재하지 않습니다.');
        // }
        // if(!password){
        //     throw new HttpException('비밀번호가 존재하지 않습니다.',400);
        //     // 이미 정해져있는 에러내용 대체가능
        //     // throw new UnauthorizedException('비밀번호가 존재하지 않습니다.');
        // }
        const user = await this.userRepository.findOne({where:{email}});
        if(user){
            // 이미 존재하는 유저
            throw new HttpException('이미 존재하는 유저입니다.',400);
        }
        const hashedPassword = await bcrypt.hash(password,12);
        await this.userRepository.save({
            email,
            nickname,
            password:hashedPassword,
        });
    }
}
