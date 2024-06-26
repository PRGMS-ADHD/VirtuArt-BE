import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import CreateUserDto from './createUser.dto';
import { User, UserDocument } from './user.schema';
import UpdateUserDto from './updateUser.dto';

export interface UserRepository {
  createUser(createUserDto: CreateUserDto): Promise<CreateUserDto>;

  findUserByEmail(email: string): Promise<any>;

  updateUser(email: string, user: User): Promise<UpdateUserDto>;

  deleteUser(email: string): Promise<void>;
}

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return this.UserModel.findOne({
      email,
    });
  }

  async updateUser(email: string, user: UpdateUserDto): Promise<UserDocument> {
    return this.UserModel.findOneAndUpdate({ email }, user, { new: true });
  }

  async deleteUser(email: string): Promise<void> {
    await this.UserModel.deleteOne({
      email,
    });
  }

  updateUsername(email: string, user: UpdateUserDto) {
    return this.UserModel.findOneAndUpdate(
      { email },
      { username: user.username },
      { new: true },
    );
  }

  async updateCoverImage(
    email: string,
    coverImagePath: string,
  ): Promise<UserDocument> {
    return this.UserModel.findOneAndUpdate(
      { email },
      { cover_image: coverImagePath },
      { new: true },
    );
  }

  async updateProfileImage(
    email: string,
    profileImagePath: string,
  ): Promise<UserDocument> {
    return this.UserModel.findOneAndUpdate(
      { email },
      { profile_image: profileImagePath },
      { new: true },
    );
  }

  async findUserById(id: ObjectId) {
    return this.UserModel.findById(id);
  }
}
