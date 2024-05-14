import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types, Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  // @Prop({ type: Types.ObjectId, auto: true })
  // _id?: ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  username: string;

  @Prop({ default: 0 })
  likes?: number;

  @Prop({ default: '' })
  instagram?: string;

  @Prop({ default: '' })
  location?: string;

  @Prop({ default: '' })
  intro?: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Buffer.from('') })
  cover_image?: Buffer;

  @Prop({ default: Buffer.from('') })
  profile_image?: Buffer;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function preSave(next: () => void) {
  if (!this.username) {
    [this.username] = this.email.split('@');
  }
  next();
});
