import { Prop, Schema } from '@nestjs/mongoose';

export type LikesDocument = Likes & Document;

@Schema({ collection: 'likes' })
export class Likes {
  @Prop()
  user_id: string;

  @Prop()
  target_id: string;

  @Prop()
  target_type: string;

  @Prop()
  created_at: Date;
}
