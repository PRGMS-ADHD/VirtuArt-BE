import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ArtistMongoRepository } from './artist.repository';
import { CreateArtistDto } from './createArtist.dto';

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
    return this.artistRepository.deleteArtist(id);
  }

  async likeArtist(id: ObjectId) {
    return this.artistRepository.likeArtist(id);
  }

  async getArtistById(id: ObjectId) {
    return this.artistRepository.getArtistById(id);
  }
}
