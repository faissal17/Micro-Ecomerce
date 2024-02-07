import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://toufikshima11:Testing123@cluster0.pvwmb1a.mongodb.net/service-auth?retryWrites=true&w=majority',
      {
        autoCreate: true,
      },
    ),
    AuthModule,
  ],
})
export class AppModule {}
