import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ArtworkController from './artwork.controller';
import ArtworkService from './artwork.service';
import { ArtworkSchema } from './artwork.schema';
import ArtworkMongoRepository from './artwork.repository';
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
    MongooseModule.forFeature([{ name: 'Artwork', schema: ArtworkSchema }]),
    forwardRef(() => LikesModule),
  ],
  controllers: [ArtworkController],
  providers: [ArtworkService, ArtworkMongoRepository],
  exports: [ArtworkService, ArtworkMongoRepository],
})
export default class ArtworkModule {}
