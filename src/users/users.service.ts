import { Injectable } from '@nestjs/common';
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
    getUser(){}
    async join(email: string, password: string,nickname: string) {
        if(!email){
            throw new Error('이메일이 존재하지 않습니다.');
        }
        if(!nickname){
            throw new Error('닉네임이 존재하지 않습니다.');
        }
        if(!password){
            throw new Error('비밀번호가 존재하지 않습니다.');
        }
        const user = await this.userRepository.findOne({where:{email}});
        if(user){
            // 이미 존재하는 유저
            throw new Error('이미 존재하는 유저입니다.');
        }
        const hashedPassword = await bcrypt.hash(password,12);
        await this.userRepository.save({
            email,
            nickname,
            password:hashedPassword,
        });
    }
}
