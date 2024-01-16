import { NestFactory } from '@nestjs/core';
import { LibraryModule } from './library.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NODE_ENV } from './infrastructure/config';

async function bootstrap() {
  const app = await NestFactory.create(LibraryModule);

  if (NODE_ENV().IS_DEVELOPMENT) {
    const options = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setDescription(process.env.npm_package_description)
      .setVersion(process.env.npm_package_version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: { docExpansion: 'none' },
    });
  }
  await app.listen(3000);
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
  console.log(`Swagger UI is running on: ${url}/api`);
  console.log(`OpenApi Spec is running on: ${url}/api-json`);
}
bootstrap();
