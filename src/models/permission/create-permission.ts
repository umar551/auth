import { ApiProperty } from "@nestjs/swagger";

export class CreatePermession{
    @ApiProperty()
    permissionId:number;
    @ApiProperty()
    permissionName:string;
    @ApiProperty()
    permissionDescription:string;
}