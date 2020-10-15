import { Post } from './../types/post';
import { PostDTO } from './post.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<Post>) {}

  async readPosts() {
    const posts = await this.postModel.find({}).populate('user');
    return posts;
  }

  async createPost(PostDTO: PostDTO, url: string) {
    const post = new this.postModel(PostDTO);
    post.image = url;
    return await post.save();
  }
}
