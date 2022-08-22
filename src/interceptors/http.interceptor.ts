import { CallHandler, ExecutionContext, HttpCode, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseData } from 'src/models/response/response';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data=>this.transformData(data)));
  }
  transformData(data:any){
    if(typeof data == 'object'){
      var resp:ResponseData<string,boolean,any>={
        message : '',
        status : true,
        data : data,
      };
    }
    else{
      var resp:ResponseData<string,boolean,any>={
        message : data,
        status : false,
        data : {},
      };
    }
    return resp;
  }
}
