import { Module } from '@nestjs/common';
import ArtworkController from './artwork.controller';
import ArtworkService from './artwork.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArtworkSchema } from './artwork.schema';
import { ArtistMongoRepository } from '../artist/artist.repository';
import ArtworkMongoRepository from './artwork.repository';

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
  ],
  controllers: [ArtworkController],
  providers: [ArtworkService, ArtworkMongoRepository],
  exports: [ArtworkService, ArtworkMongoRepository],
})
export class ArtworkModule {}
