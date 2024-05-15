import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtworkDocument = Artwork & Document;

@Schema({ collection: 'artwork' })
export class Artwork {
  @Prop({ default: '' })
  artist: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  e_name: string;

  @Prop({ default: 0 })
  likes?: number;

  @Prop({ default: '' })
  description?: string;

  @Prop({ default: '' })
  intro?: string;

  @Prop({ default: '' })
  tags?: string[];

  @Prop({ default: '' })
  image?: string;

  @Prop({ default: '' })
  category: string;
}

export const ArtworkSchema = SchemaFactory.createForClass(Artwork);
