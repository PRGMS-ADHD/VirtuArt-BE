import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { plainToClass } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { UserMongoRepository } from './user.repository';
import CreateUserDto from './createUser.dto';
import { User, UserDocument } from './user.schema';
import UpdateUserDto from './updateUser.dto';
import LikesService from '../likes/likes.service';
import UserInfoDto from './userInfo.dto';

@Injectable()
export default class UserService {
  private readonly s3Client: S3Client;

  private readonly bucketName: string;

  constructor(
    private userRepository: UserMongoRepository,
    private configService: ConfigService,
    @Inject(forwardRef(() => LikesService))
    private likesService: LikesService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET');
  }

  async uploadImageToS3(
    file: Express.Multer.File,
    type: 'profile' | 'cover',
    email: string,
  ): Promise<string> {
    const keyPrefix = type === 'profile' ? 'profile/' : 'cover/';
    const params = {
      Bucket: this.bucketName,
      Key: `${keyPrefix}${email}-${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await this.s3Client.send(command);
    return `https://${this.bucketName}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${params.Key}`;
  }

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

  async updateCoverImage(email: string, file: Express.Multer.File) {
    const imageUrl = await this.uploadImageToS3(file, 'cover', email);
    return this.userRepository.updateCoverImage(email, imageUrl);
  }

  async updateProfileImage(email: string, file: Express.Multer.File) {
    const imageUrl = await this.uploadImageToS3(file, 'profile', email);
    return this.userRepository.updateProfileImage(email, imageUrl);
  }

  private static saveImage(
    imageBuffer: Buffer,
    type: string,
    email: string,
  ): string {
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads', type);
    fs.ensureDirSync(uploadsDir);
    const imagePath = path.join(uploadsDir, `${email}.jpg`);
    fs.writeFileSync(imagePath, imageBuffer);
    console.log(imagePath);
    return path.resolve(imagePath);
  }

  async updateUserProfile(email: string, profileDto: UpdateUserDto) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }

    // 입력된 필드만 업데이트하고 나머지는 기존 값을 유지
    const updatedUser = {
      username: profileDto.username ?? user.username,
      location: profileDto.location ?? user.location,
      intro: profileDto.intro ?? user.intro,
      instagram: profileDto.instagram ?? user.instagram,
    };

    return this.userRepository.updateUser(email, updatedUser);
  }

  async getUserPublicInfo(email: string): Promise<UserInfoDto> {
    const user = await this.getUserInfo(email);
    if (!user) {
      throw new Error('User not found');
    }

    // 비밀번호 제거
    const { password, ...userInfo } = user;

    return plainToClass(UserInfoDto, userInfo);
  }
}
