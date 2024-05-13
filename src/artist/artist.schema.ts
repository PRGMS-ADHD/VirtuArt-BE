import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema({ collection: 'artists' })
export class Artist {
  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  e_name: string;

  @Prop({ default: 0 })
  likes?: number;

  @Prop({ default: '' })
  instagram?: string;

  @Prop({ default: '' })
  location?: string;

  @Prop({ default: '' })
  intro?: string;

  @Prop({ default: '' })
  cover_image?: string;

  @Prop({ default: '' })
  profile_image?: string;

  @Prop({ default: '' })
  category: number;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
