import { Controller, Get } from '@nestjs/common';
import ArtworkService from './artwork.service';

@Controller('artwork')
export default class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Get('/:name')
  async getArtworkByName() {
    return this.artworkService.getArtworkByName();
  }
}
