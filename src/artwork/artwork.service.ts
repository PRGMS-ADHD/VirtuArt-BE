import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import LikesService from '../likes/likes.service';
import ArtworkMongoRepository from './artwork.repository';

@Injectable()
export default class ArtworkService {
  constructor(
    private artworkRepository: ArtworkMongoRepository,
    @Inject(forwardRef(() => LikesService))
    private likesService: LikesService,
  ) {}

  async getArtworkById(id: ObjectId) {
    const artwork = await this.artworkRepository.getArtworkById(id);
    const collector = await this.likesService.getArtworkLikers(id);
    return { ...artwork.toObject(), collector };
  }

  createArtwork() {
    return this.artworkRepository.createArtwork();
  }

  async getAllArtwork() {
    return this.artworkRepository.getAllArtwork();
  }

  deleteArtwork(id: ObjectId) {
    return this.artworkRepository.deleteArtwork(id);
  }

  async incrementLikes(id: ObjectId) {
    return this.artworkRepository.incrementLikes(id);
  }

  async decrementLikes(id: ObjectId) {
    return this.artworkRepository.decrementLikes(id);
  }

  async getArtworkByArtist(artistId: string) {
    return this.artworkRepository.findByArtist(artistId);
  }
}
