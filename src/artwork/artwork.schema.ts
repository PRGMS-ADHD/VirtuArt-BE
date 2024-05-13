import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtworkDocument = Artwork & Document;

@Schema({ collection: 'artwork' })
export class Artwork {
  @Prop({ default: '' })
  artist: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: 0 })
  likes?: number;

  @Prop()
  description?: string;

  @Prop()
  tags?: string[];

  @Prop()
  image?: string;

  @Prop({ default: '' })
  category: string;
}

export const ArtworkSchema = SchemaFactory.createForClass(Artwork);
