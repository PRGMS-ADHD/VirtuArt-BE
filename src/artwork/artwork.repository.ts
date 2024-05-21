import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Artwork, ArtworkDocument } from './artwork.schema';

interface ArtworkRepository {
  getArtworkById(id: ObjectId): Promise<any>;
}

@Injectable()
export default class ArtworkMongoRepository implements ArtworkRepository {
  constructor(
    @InjectModel(Artwork.name) private ArtworkModel: Model<Artwork>,
  ) {}

  async getArtworkById(id: ObjectId): Promise<any> {
    return this.ArtworkModel.findById(id);
  }

  createArtwork() {
    return this.ArtworkModel.create({
      title: 'New Artwork',
      description: 'A new artwork',
      artist: '60c4e1d9d9f8f0001f1e2b0b',
    });
  }

  getAllArtwork() {
    return this.ArtworkModel.find();
  }

  deleteArtwork(id: ObjectId) {
    return this.ArtworkModel.findByIdAndDelete(id);
  }

  incrementLikes(id: ObjectId) {
    return this.ArtworkModel.findByIdAndUpdate(id, { $inc: { likes: 1 } });
  }

  decrementLikes(id: ObjectId) {
    return this.ArtworkModel.findByIdAndUpdate(id, { $inc: { likes: -1 } });
  }

  async findByArtist(artistId: string): Promise<Artwork[]> {
    return this.ArtworkModel.find({ artist_id: artistId }).exec();
  }
}
