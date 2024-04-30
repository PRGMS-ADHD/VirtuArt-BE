import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import UserService from './user.service';
import CreateUserDto from './createUser.dto';
import UpdateUserDto from './updateUser.dto';

@Controller('user')
export default class UserController {
  constructor(private userService: UserService) {
  }

  @Post('/create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('/getUser/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    return user;
  }

  @Put('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(email, user);
  }

  @Delete('/delete/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}
