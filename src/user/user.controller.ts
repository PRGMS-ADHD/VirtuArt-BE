import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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
    return this.userService.getUserInfo(email);
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
}
