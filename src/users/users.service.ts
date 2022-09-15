import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '@/users/schemas/users.schema';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: CreateUserDto): Promise<UserDocument> {
    const User = new this.userModel(data);
    return User.save();
  }

  async findOne(
    params: any,
    select?: string,
  ): Promise<UserDocument | undefined> {
    return this.userModel.findOne(params).select(select).exec();
  }
}
