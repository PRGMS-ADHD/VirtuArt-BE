import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import CreateUserDto from '../user/createUser.dto';
import UserService from '../user/user.service';
import { JwtPayload } from './jwtPayload.interface';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export default class AuthService {
  private readonly config;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.config = this.configService.get('JWT_SECRET');
  }

  async register(userDto: CreateUserDto) {
    const user = await this.userService.getUserInfo(userDto.email);

    if (user) {
      throw new HttpException(
        '해당 유저가 이미 있습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

    try {
      const newUser = await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      throw new HttpException('서버 에러', 500);
    }
  }

  async validateUser(email: string, password: string): Promise<JwtPayload> {
    const user = await this.userService.getUserInfo(email);

    if (!user) {
      return null;
    }

    const { password: hashedPassword, ...userInfo } = user;
    if (bcrypt.compareSync(password, hashedPassword)) {
      return userInfo;
    }
    return null;
  }

  async generateToken(user: JwtPayload) {
    return this.jwtService.sign(user);
  }

  async updatePassword(
    email: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.userService.getUserInfo(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!bcrypt.compareSync(currentPassword, user.password)) {
      throw new HttpException(
        'Invalid current password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const encryptedPassword = bcrypt.hashSync(newPassword, 10);
    return this.userService.updateUser(email, { password: encryptedPassword });
  }

  async deleteUser(email: string) {
    await this.userService.deleteUser(email);
  }

  verify(jwtString: string) {
    try {
      // 외부에 노출되지 않는 secret 을 사용하기 때문에 이 토큰이 유효한지 검증 가능
      const payload = jwt.verify(jwtString, this.config) as
        | JwtPayload
        | UserDocument;
      const { email } = payload;

      return {
        email,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
