import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import LikesService from './likes.service';
import LikesController from './likes.controller';
import { Likes, LikesSchema } from './likes.schema';
import ArtistModule from '../artist/artist.module';
import ArtworkModule from '../artwork/artwork.module';
import AuthModule from '../auth/auth.module';
import UserModule from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Likes.name, schema: LikesSchema }]),
    forwardRef(() => ArtistModule),
    forwardRef(() => ArtworkModule),
    forwardRef(() => UserModule),
    AuthModule,
  ],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [LikesService],
})
export default class LikesModule {}
