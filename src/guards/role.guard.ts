import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this._reflector.get<string>(
        "permission",
        context.getHandler()
    );
    if (!permissions) {
      return false;
    }
    const { user } = context.switchToHttp().getRequest();
    if(user && user.roleId == 1){
        return true
    }
    else{
      return this.checkPermissions(user.permissions,permissions)
    }
  }
  checkPermissions(perm:any[],permissions:string){
    return perm.some((x)=>x.permissions ==permissions);
  }
}