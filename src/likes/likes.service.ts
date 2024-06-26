import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Likes, LikesDocument } from './likes.schema';
// eslint-disable-next-line import/no-cycle
import ArtistService from '../artist/artist.service';
// eslint-disable-next-line import/no-cycle
import ArtworkService from '../artwork/artwork.service';
// eslint-disable-next-line import/no-cycle
import UserService from '../user/user.service';

@Injectable()
export default class LikesService {
  constructor(
    @InjectModel(Likes.name) private likesModel: Model<LikesDocument>,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => ArtworkService))
    private artworkService: ArtworkService,
    private userService: UserService,
  ) {}

  async toggleLike(
    email: string,
    targetType: string,
    targetId: ObjectId,
  ): Promise<boolean> {
    const existingLike = await this.likesModel.findOne({
      email,
      target_id: targetId,
      target_type: targetType,
    });

    if (existingLike) {
      await existingLike.deleteOne({ _id: existingLike._id });
      if (targetType === 'artist') {
        await this.artistService.decrementLikes(targetId);
      } else if (targetType === 'artwork') {
        await this.artworkService.decrementLikes(targetId);
      }
      return false;
    }

    // eslint-disable-next-line new-cap
    const newLike = new this.likesModel({
      email,
      target_id: targetId,
      target_type: targetType,
      created_at: new Date(),
    });

    await newLike.save();

    if (targetType === 'artist') {
      await this.artistService.incrementLikes(targetId);
    } else if (targetType === 'artwork') {
      await this.artworkService.incrementLikes(targetId);
    } else {
      throw new Error('Invalid target type');
    }

    return true;
  }

  async getUserLikedArtists(email: string) {
    const likes = await this.likesModel
      .find({ email, target_type: 'artist' })
      .select('target_id')
      .exec();

    const likedArtists = await Promise.all(
      likes.map(async (like) => {
        const artist = await this.artistService.getArtistById(like.target_id);
        return {
          _id: artist._id,
          name: artist.name,
          profile_image: artist.profile_image,
        };
      }),
    );

    return likedArtists;
  }

  async getArtistLikers(
    targetId: ObjectId,
  ): Promise<{ _id: ObjectId; username: string }[]> {
    const likes = await this.likesModel
      .find({ target_id: targetId, target_type: 'artist' })
      .select('email')
      .exec();

    const likers = await Promise.all(
      likes.map(async (like) => {
        const user = await this.userService.getUserByEmail(like.email);
        return {
          _id: user._id,
          username: user.username,
          profile_image: user.profile_image,
        };
      }),
    );

    return likers;
  }

  async getArtworkLikers(
    targetId: ObjectId,
  ): Promise<{ _id: ObjectId; username: string }[]> {
    const likes = await this.likesModel
      .find({ target_id: targetId, target_type: 'artwork' })
      .select('email')
      .exec();

    const likers = await Promise.all(
      likes.map(async (like) => {
        const user = await this.userService.getUserByEmail(like.email);
        return {
          _id: user._id,
          username: user.username,
          profile_image: user.profile_image,
        };
      }),
    );

    return likers;
  }

  async getUserLikedArtworks(email: string) {
    try {
      const likes = await this.likesModel
        .find({ email, target_type: 'artwork' })
        .select('target_id')
        .exec();

      const likedArtworks = await Promise.all(
        likes.map(async (like) => {
          try {
            const artwork = await this.artworkService.getArtworkById(
              like.target_id,
            );
            return {
              _id: artwork._id,
              artist: artwork.artist,
              name: artwork.name,
              image: artwork.image,
            };
          } catch (error) {
            console.error(
              `Error fetching artwork for ID ${like.target_id}: ${error.message}`,
            );
            return null;
          }
        }),
      );

      return likedArtworks.filter((artwork) => artwork !== null);
    } catch (error) {
      console.error(`Error in getUserLikedArtworks: ${error.message}`);
      throw error; // rethrow the error after logging it
    }
  }
}
