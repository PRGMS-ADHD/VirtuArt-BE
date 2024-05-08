import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import ArtworkRepository from './artwork.repository';

@Injectable()
export default class ArtworkService {
  constructor(private artworkRepository: ArtworkRepository) {}

  getArtworkById(id: ObjectId) {
    return this.artworkRepository.getArtworkById(id);
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
}
