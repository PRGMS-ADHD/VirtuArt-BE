import { Injectable, NotFoundException } from '@nestjs/common';
import { UserMongoRepository } from './user.repository';
import CreateUserDto from './createUser.dto';
import { User } from './user.schema';
import UpdateUserDto from './updateUser.dto';

@Injectable()
export default class UserService {
  constructor(private userRepository: UserMongoRepository) {}

  createUser(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }

  async getUserInfo(email: string) {
    const result = await this.userRepository.findUserByEmail(email);

    if (!result) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }

    return result;
  }

  async updateUser(email: string, _user: UpdateUserDto) {
    const user: User = await this.getUserInfo(email);
    user.password = _user.password;
    return this.userRepository.updateUser(email, user);
  }

  deleteUser(email: string) {
    return this.userRepository.deleteUser(email);
  }
}
