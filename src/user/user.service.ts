import { Injectable } from '@nestjs/common';
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

  async getUser(email: string) {
    const result = await this.userRepository.findUserByEmail(email);
    return result;
  }

  async updateUser(email: string, _user: UpdateUserDto) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.password = _user.password;
    console.log(user);
    return this.userRepository.updateUser(email, user);
  }

  deleteUser(email: string) {
    return this.userRepository.deleteUser(email);
  }
}
