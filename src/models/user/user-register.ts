import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import * as bcrypt from 'bcryptjs';
export class UserRegister{
    @ApiProperty()
    name:string

    @ApiProperty()
    email:string
    
    @ApiProperty()
    @Transform(({ value }) => bcrypt.hashSync(value,10))
    password:string

    @ApiProperty()
    phone:string
}