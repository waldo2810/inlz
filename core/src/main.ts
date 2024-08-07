import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app
    .listen(process.env.PORT || 8080, '0.0.0.0')
    .then(() => console.log('Server is running on port', process.env.PORT));
}
bootstrap();
