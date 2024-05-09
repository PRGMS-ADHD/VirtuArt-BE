import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Response,
  Headers,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import AuthService from './auth.service';
import CreateUserDto from '../user/createUser.dto';
import { User } from '../user/user.schema';
import UserService from '../user/user.service';
import AuthGuard from './auth.guard';

@Controller('auth')
export default class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Request() req, @Response() res) {
    const { email, password } = req.body;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return res
        .status(400)
        .json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
    }
    const token = await this.authService.generateToken({ email });
    return res.send({ token });
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  async changePassword(@Request() req, @Response() res) {
    const { email, currentPassword, newPassword } = req.body;
    if (email !== req.user.email) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const user = await this.authService.validateUser(email, currentPassword);

    if (!user) {
      return res.status(401).send({ message: 'Invalid current password' });
    }

    await this.authService.updatePassword(
      // req.user.email,
      email,
      currentPassword,
      newPassword,
    );
    return res.send({ message: 'Password changed successfully' });
  }

  @Delete('delete-account')
  async deleteAccount(@Request() req, @Response() res) {
    const { email } = req.user;

    try {
      await this.authService.deleteUser(email);
      return res.send({ message: 'Account deleted successfully' });
    } catch (error) {
      return res.status(500).send({ message: 'Error deleting account' });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':email')
  async getUserInfo(
    @Headers() headers: any,
    @Param('email') email: string,
    @Request() req,
  ): Promise<User> {
    if (req.user.email !== email) {
      throw new HttpException('권한이 없습니다.', 403);
    }

    return this.userService.getUserInfo(email);
  }
}
