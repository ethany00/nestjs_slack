import {HttpException, Injectable} from '@nestjs/common';
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
        if(!email){
            throw new HttpException('이메일이 존재하지 않습니다.',400);
        }
        if(!nickname){
            throw new HttpException('닉네임이 존재하지 않습니다.',400);
        }
        if(!password){
            throw new HttpException('비밀번호가 존재하지 않습니다.',400);
        }
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
