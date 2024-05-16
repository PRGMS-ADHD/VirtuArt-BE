import { IsString } from 'class-validator';

export default class LikedArtworkDto {
  @IsString()
  _id: string;

  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsString()
  image: string;
}
