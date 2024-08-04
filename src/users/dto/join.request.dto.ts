import {ApiProperty, PickType} from "@nestjs/swagger";
import {Users} from "../../entities/Users";

export class JoinRequestDto extends PickType(Users, [
    'email','password','nickname'
] as const){
    // 상속으로 전부 필요없음
    // @ApiProperty({
    //     example:'abc@abc.com',
    //     description:'이메일',
    //     required:true
    // })
    // public email: string;
    //
    // @ApiProperty({
    //     example:'1234',
    //     description:'비밀번호',
    //     required:true
    // })
    // public password: string;
    //
    // @ApiProperty({
    //     example:'ethany00',
    //     description:'닉네임',
    //     required:true
    // })
    // public nickname: string;
}