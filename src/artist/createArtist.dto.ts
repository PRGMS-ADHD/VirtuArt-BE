export interface CreateArtistDto {
  name: string;
  e_name: string;
  likes?: number;
  instagram?: string;
  location?: string;
  intro?: string;
  collectors?: string[];
  cover_image?: Buffer;
  profile_image?: Buffer;
}
