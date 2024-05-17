import { Injectable } from '@nestjs/common';
import { CreateAuthDto, UpdateAuthDto } from './dto';
import { User, UserDocument } from './Schema/auth..schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createAuthDto: CreateAuthDto) {
    const createdUser = new this.userModel(createAuthDto);
    return createdUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({
      email: email,
    });
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    return await this.userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: updateAuthDto,
      },
    );
  }
}
