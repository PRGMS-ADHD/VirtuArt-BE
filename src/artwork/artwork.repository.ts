import { Injectable } from '@nestjs/common';
import { Artwork } from './artwork.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface ArtworkRepository {
  getArtworkByName(): Promise<any>;
}

@Injectable()
export default class ArtworkMongoRepository implements ArtworkRepository {
  constructor(
    @InjectModel(Artwork.name) private ArtworkModel: Model<Artwork>,
  ) {}

  async getArtworkByName(): Promise<any> {
    return this.ArtworkModel.find();
  }
}
