import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'node:fs';
import UserService from './user.service';
import CreateUserDto from './createUser.dto';
import UpdateUserDto from './updateUser.dto';
import AuthGuard from '../auth/auth.guard';

@Controller('user')
export default class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('/:email')
  async getUser(@Param('email') email: string) {
    return this.userService.getUserPublicInfo(email);
  }

  @Put('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(email, user);
  }

  @Delete('/delete/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }

  // 유저네임 수정
  @UseGuards(AuthGuard)
  @Put('/username/:email')
  updateUsername(@Param('email') email: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUsername(email, user);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('cover_image'))
  @Put('/upload/cover/:email')
  uploadCoverImage(
    @Param('email') email: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateCoverImage(email, file.buffer);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('profile_image'))
  @Put('/upload/profile/:email')
  uploadProfileImage(
    @Param('email') email: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateProfileImage(email, file.buffer);
  }

  // 프로필 이미지 가져오기
  @Get('/profile/:email')
  async getProfileImage(@Param('email') email: string, @Res() res) {
    const user = await this.userService.getUserByEmail(email);
    if (user.profile_image) {
      const imagePath = user.profile_image;
      const image = fs.readFileSync(imagePath);
      res.set('Content-Type', 'image/jpeg');
      res.send(image);
    } else {
      res.status(404).send('Profile image not found');
    }
  }

  // 커버 이미지 가져오기
  @Get('/cover/:email')
  async getCoverImage(@Param('email') email: string, @Res() res) {
    const user = await this.userService.getUserByEmail(email);
    if (user.cover_image) {
      const imagePath = user.cover_image;
      const image = fs.readFileSync(imagePath);
      res.set('Content-Type', 'image/jpeg');
      res.send(image);
    } else {
      res.status(404).send('Cover image not found');
    }
  }

  @UseGuards(AuthGuard)
  @Patch('/profile/:email')
  async updateUserProfile(
    @Param('email') email: string,
    @Body() profileDto: UpdateUserDto,
  ) {
    return this.userService.updateUserProfile(email, profileDto);
  }
}
