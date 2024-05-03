import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
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

  @Post('/create')
  async createArtist(@Body() artist: CreateArtistDto) {
    return this.artistService.createArtist(artist);
  }

  @Delete('/delete/:id')
  async deleteArtist(@Body() id: ObjectId) {
    return this.artistService.deleteArtist(id);
  }
}
