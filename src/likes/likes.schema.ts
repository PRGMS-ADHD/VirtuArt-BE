import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types, Document } from 'mongoose';

export type LikesDocument = Likes & Document;

@Schema({ collection: 'likes' })
export class Likes {
  @Prop()
  email: string;

  @Prop({ type: Types.ObjectId })
  target_id: ObjectId;

  @Prop()
  target_type: string;

  @Prop()
  created_at: Date;
}

export const LikesSchema = SchemaFactory.createForClass(Likes);
