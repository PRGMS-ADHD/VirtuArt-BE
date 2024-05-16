import {
  Controller,
  Param,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import LikesService from './likes.service';
import AuthGuard from '../auth/auth.guard';

@Controller('likes')
@UseGuards(AuthGuard)
export default class LikesController {
  constructor(private likesService: LikesService) {}

  @Post(':target_type/:target_id')
  async toggleLike(
    @Request() req,
    @Param('target_type') targetType: string,
    @Param('target_id') targetId: ObjectId,
  ): Promise<boolean> {
    const { email } = req.user;
    return this.likesService.toggleLike(email, targetType, targetId);
  }

  @Get('/user/artists')
  async getUserLikedArtists(@Request() req) {
    const { email } = req.user;
    return this.likesService.getUserLikedArtists(email);
  }

  @Get('/artist/:id/collectors')
  async getArtistLikers(@Param('id') id: ObjectId) {
    return this.likesService.getArtistLikers(id);
  }

  @Get('/artwork/:id/collectors')
  async getArtworkLikers(@Param('id') id: ObjectId) {
    return this.likesService.getArtworkLikers(id);
  }
}
