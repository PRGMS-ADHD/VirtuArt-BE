import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export default class UpdateUserDto {
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  cover_image?: string;

  @IsOptional()
  @IsString()
  profile_image?: string;
}
