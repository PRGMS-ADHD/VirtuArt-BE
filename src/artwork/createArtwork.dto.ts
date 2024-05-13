export interface CreateArtworkDto {
  artist: string;
  name: string;
  likes?: number;
  intro?: string;
  collectors?: string[];
  cover_image?: Buffer;
  profile_image?: Buffer;
  category: string;
}
