import { ApiProperty } from "@nestjs/swagger";

export class UserQueryParams{
    page:number
    limit:number
    get getParams(){
        return [
            this.page,
            this.limit,
        ]
    }
    constructor(params){
        this.page = params.page??1;
        this.limit = params.limit??10;
    }
}