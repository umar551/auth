import { SetMetadata } from "@nestjs/common";
import { PermissionEnum } from "src/enums/permission.enum";

export const permission = (value:PermissionEnum)=>{
    return SetMetadata('permission',value);
} 