import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ArtistMongoRepository } from './artist.repository';
import { CreateArtistDto } from './createArtist.dto';
import LikesService from '../likes/likes.service';

@Injectable()
export default class ArtistService {
  constructor(
    private artistRepository: ArtistMongoRepository,
    private likesService: LikesService,
  ) {}

  async getAllArtists() {
    return this.artistRepository.getAllArtists();
  }

  createArtist(artist: CreateArtistDto) {
    return this.artistRepository.createArtist(artist);
  }

  deleteArtist(id: ObjectId) {
    return this.artistRepository.deleteArtist(id);
  }

  async getArtistById(id: ObjectId) {
    const artist = await this.artistRepository.getArtistById(id);
    const collectors = await this.likesService.getArtistLikers(id);
    return { ...artist.toObject(), collectors };
  }

  async incrementLikes(id: ObjectId) {
    return this.artistRepository.incrementLikes(id);
  }

  async decrementLikes(id: ObjectId) {
    return this.artistRepository.decrementLikes(id);
  }
}
