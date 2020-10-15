import { Document } from 'mongoose';

export interface Post extends Document {
  readonly user: string;
  readonly content: string;
  readonly uploadTime: string;
  image: string;
  userImage:string
}
