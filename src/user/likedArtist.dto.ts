import { IsString } from 'class-validator';

export default class LikedArtistDto {
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  profile_image: string;
}
