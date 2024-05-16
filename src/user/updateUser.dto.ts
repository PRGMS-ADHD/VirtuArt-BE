import { IsOptional, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly location?: string;

  @IsOptional()
  @IsString()
  readonly intro?: string;

  @IsOptional()
  @IsString()
  readonly instagram?: string;

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
