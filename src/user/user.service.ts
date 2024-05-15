import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { UserMongoRepository } from './user.repository';
import CreateUserDto from './createUser.dto';
import { User, UserDocument } from './user.schema';
import UpdateUserDto from './updateUser.dto';
import LikesService from '../likes/likes.service';

@Injectable()
export default class UserService {
  constructor(
    private userRepository: UserMongoRepository,
    @Inject(forwardRef(() => LikesService))
    private likesService: LikesService,
  ) {}

  createUser(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }

  async checkUserExist(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    return !!user;
  }

  async getUserInfo(email: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }

    const likedArtists = await this.likesService.getUserLikedArtists(email);
    return { ...user.toObject(), likedArtists };
  }

  async updateUser(email: string, _user: UpdateUserDto) {
    const user: User = await this.getUserInfo(email);
    user.password = _user.password;
    return this.userRepository.updateUser(email, user);
  }

  deleteUser(email: string) {
    return this.userRepository.deleteUser(email);
  }

  updateUsername(email: string, user: UpdateUserDto) {
    const { username } = user;
    if (!username) {
      throw new BadRequestException('사용하실 닉네임을 입력해주세요.');
    }
    return this.userRepository.updateUsername(email, user);
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }

    return user;
  }

  async updateCoverImage(email: string, coverImage: Buffer) {
    const imagePath = UserService.saveImage(coverImage, 'cover', email);
    return this.userRepository.updateCoverImage(email, imagePath);
  }

  async updateProfileImage(email: string, profileImage: Buffer) {
    const imagePath = UserService.saveImage(profileImage, 'profile', email);
    return this.userRepository.updateProfileImage(email, imagePath);
  }

  private static saveImage(
    imageBuffer: Buffer,
    type: string,
    email: string,
  ): string {
    const imagePath = path.join(
      __dirname,
      '..',
      'uploads',
      type,
      `${email}.jpg`,
    );
    fs.ensureDirSync(path.dirname(imagePath));
    fs.writeFileSync(imagePath, imageBuffer);
    return imagePath;
  }
}
