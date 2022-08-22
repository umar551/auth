import { CacheModule, Global, Module } from "@nestjs/common";
import { ConfigService } from "src/services/config.service";
import { JwtStrategy } from "src/services/jwt.strategy";
import { QueryService } from "src/services/query.service";

const providers =[
    ConfigService,
    QueryService,JwtStrategy,
]
@Global()
@Module({
    providers: [...providers],
    exports:[
        ...providers
    ],
    imports:[CacheModule.register({
        isGlobal: true,
      }),]
})
export class SharedModule {}