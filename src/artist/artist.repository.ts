import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Artist } from './artist.schema';
import { CreateArtistDto } from './createArtist.dto';

export interface ArtistRepository {
  getAllArtists(): Promise<any>;
}

@Injectable()
export class ArtistMongoRepository implements ArtistRepository {
  constructor(@InjectModel(Artist.name) private ArtistModel: Model<Artist>) {}

  async getAllArtists(): Promise<any> {
    return this.ArtistModel.find();
  }

  createArtist(artist: CreateArtistDto) {
    const createdArtist = new this.ArtistModel(artist);
    return createdArtist.save();
  }

  deleteArtist(id: ObjectId) {
    return this.ArtistModel.findByIdAndDelete(id);
  }

  async getArtistById(id: ObjectId) {
    return this.ArtistModel.findById(id);
  }

  incrementLikes(id: ObjectId) {
    return this.ArtistModel.findByIdAndUpdate(id, { $inc: { likes: 1 } });
  }

  decrementLikes(id: ObjectId) {
    return this.ArtistModel.findByIdAndUpdate(id, { $inc: { likes: -1 } });
  }
}
