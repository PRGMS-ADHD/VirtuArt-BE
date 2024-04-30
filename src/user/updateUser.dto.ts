import { IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  newPassword: string;

  @IsString()
  confirmPassword: string;
}