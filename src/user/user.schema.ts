import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  username: string;

  @Prop({ default: 0 })
  likes?: number;

  @Prop()
  instagram?: string;

  @Prop()
  location?: string;

  @Prop()
  intro?: string;

  @Prop([{ artwork_id: { type: Types.ObjectId, ref: 'Artwork' } }])
  liked_artworks?: { artwork_id: Types.ObjectId }[];

  @Prop([{ object_id: { type: Types.ObjectId, ref: 'Artist' } }])
  liked_artist?: { artwork_id: Types.ObjectId }[];

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  cover_image?: Buffer;

  @Prop()
  profile_image?: Buffer;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function preSave(next: () => void) {
  if (!this.username) {
    [this.username] = this.email.split('@');
  }
  next();
});
