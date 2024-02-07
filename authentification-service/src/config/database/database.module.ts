import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rachid:rachid1234567890@cluster0.4k3tkhp.mongodb.net/service-authentification?retryWrites=true&w=majority',
    ),
  ],
})
export class DATABASE_CONNECTION {}
