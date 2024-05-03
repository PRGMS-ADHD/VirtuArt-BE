import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = Artwork & Document;

@Schema({ collection: 'artwork' })
export class Artwork {
  @Prop({ default: '' })
  artist: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: 0 })
  likes?: number;

  @Prop()
  collectors?: Types.ObjectId[];

  @Prop()
  description?: string;

  @Prop()
  tags?: string[];

  @Prop()
  image?: string;
}

export const ArtworkSchema = SchemaFactory.createForClass(Artwork);
