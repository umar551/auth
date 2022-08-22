import { ApiProperty } from "@nestjs/swagger";
import { CreatePermession } from "./create-permission";

export class CreateRolePermission{
    @ApiProperty()
    roleId:number;
    @ApiProperty()
    roleName:string;
    @ApiProperty({type:[CreatePermession]})
    permissions:CreatePermession[];
}