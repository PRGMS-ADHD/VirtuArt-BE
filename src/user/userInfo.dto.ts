import {
  IsArray,
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import LikedArtistDto from './likedArtist.dto';
import LikedArtworkDto from './likedArtwork.dto';

export default class UserInfoDto {
  @IsString()
  _id: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsNumber()
  likes: number;

  @IsDate()
  created_at: Date;

  @IsNumber()
  __v: number;

  @IsString()
  profile_image: string;

  @IsString()
  cover_image: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LikedArtistDto)
  likedArtists: LikedArtistDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LikedArtworkDto)
  likedArtwork: LikedArtworkDto[];

  // Optional fields
  @IsString()
  instagram?: string;

  @IsString()
  location?: string;

  @IsString()
  intro?: string;
}
