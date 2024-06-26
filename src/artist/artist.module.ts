import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArtistMongoRepository } from './artist.repository';
import ArtistService from './artist.service';
import ArtistController from './artist.controller';
import { ArtistSchema } from './artist.schema';
import LikesModule from '../likes/likes.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Artist', schema: ArtistSchema }]),
    forwardRef(() => LikesModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistMongoRepository],
  exports: [ArtistService, ArtistMongoRepository],
})
export default class ArtistModule {}
