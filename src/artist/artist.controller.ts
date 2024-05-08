import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import ArtistService from './artist.service';
import { CreateArtistDto } from './createArtist.dto';

@Controller('artist')
export default class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('/all')
  async getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  async getArtistById(@Param('id') id: ObjectId) {
    return this.artistService.getArtistById(id);
  }

  @Post('/create')
  async createArtist(@Body() artist: CreateArtistDto) {
    return this.artistService.createArtist(artist);
  }

  @Delete('/delete/:id')
  async deleteArtist(@Param('id') id: ObjectId) {
    return this.artistService.deleteArtist(id);
  }

  // 좋아요
  @Post('/like/:id')
  async likeArtist(@Param('id') id: ObjectId) {
    return this.artistService.likeArtist(id);
  }
}
