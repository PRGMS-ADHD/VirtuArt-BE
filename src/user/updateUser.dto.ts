import { IsOptional, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
