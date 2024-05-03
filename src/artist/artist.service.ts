import { Injectable } from '@nestjs/common';
import { ArtistMongoRepository } from './artist.repository';
import { CreateArtistDto } from './createArtist.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export default class ArtistService {
  constructor(private artistRepository: ArtistMongoRepository) {}

  async getAllArtists() {
    return this.artistRepository.getAllArtists();
  }

  createArtist(artist: CreateArtistDto) {
    return this.artistRepository.createArtist(artist);
  }

  deleteArtist(id: ObjectId) {
    return Promise.resolve(undefined);
  }
}
