import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ArtistController from './artist/artist.controller';
import ArtistService from './artist/artist.service';
import ArtistModule from './artist/artist.module';
import ArtworkModule from './artwork/artwork.module';
import LikesModule from './likes/likes.module';
import AppController from './app.controller';
import AppService from './app.service';
import UserModule from './user/user.module';
import AuthModule from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    ArtistModule,
    ArtworkModule,
    LikesModule,
  ],
  controllers: [AppController, ArtistController],
  providers: [AppService, ArtistService],
})
export default class AppModule {}
