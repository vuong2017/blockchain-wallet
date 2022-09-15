import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username }, '+password');
    if (!user) return false;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return false;
    return user;
  }

  async login(user: any) {
    const payloadJWT: { id: string } = { id: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payloadJWT),
    };
  }

  async register(user: CreateUserDto) {
    const payload: CreateUserDto = {
      username: user.username,
      password: user.password,
      fullName: user.fullName,
    };
    const findUser = await this.usersService.findOne({
      username: payload.username,
    });
    if (findUser) {
      throw 'Exits';
    }
    const saltOrRounds = 10;
    payload.password = await bcrypt.hash(payload.password, saltOrRounds);
    const createdUser = await this.usersService.create(payload);
    const payloadJWT: { id: string } = { id: createdUser.id };
    const cloneCreatedUser = createdUser.toObject();
    delete cloneCreatedUser.password;
    return {
      ...cloneCreatedUser,
      access_token: this.jwtService.sign(payloadJWT),
    };
  }
}
