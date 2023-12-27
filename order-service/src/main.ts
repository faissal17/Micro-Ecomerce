import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const databaseservice = app.get(DatabaseService);
  await databaseservice.onModuleInit();

  await app.listen(3000);
}
bootstrap();
