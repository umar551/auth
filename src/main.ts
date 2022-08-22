import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { createClient } from 'redis';
// export const client = createClient();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Role backend')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // client.connect()
  // .then(()=>console.log("Connected to Redis"))
  // .catch((err)=>console.log(err));
  await app.listen(3000)
  .then(()=>console.log("Server is running on port "+3000))
  .catch((err)=>console.log(err))
}
bootstrap();
