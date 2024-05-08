import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import ArtworkService from './artwork.service';

@Controller('artwork')
export default class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Get('/all')
  async getAllArtwork() {
    return this.artworkService.getAllArtwork();
  }

  @Get('/:id')
  async getArtworkById(@Param('id') id: ObjectId) {
    return this.artworkService.getArtworkById(id);
  }

  @Post('/create')
  async createArtwork() {
    return this.artworkService.createArtwork();
  }

  @Delete('/delete/:id')
  async deleteArtwork(@Param('id') id: ObjectId) {
    return this.artworkService.deleteArtwork(id);
  }
}
