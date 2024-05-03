import { Injectable } from '@nestjs/common';
import ArtworkRepository from './artwork.repository';

@Injectable()
export default class ArtworkService {
  constructor(private artworkRepository: ArtworkRepository) {}
  getArtworkByName() {
    return this.artworkRepository.getArtworkByName();
  }
}
