import { Post } from './../types/post';

export interface PostDTO {
  user: string;
  content: string;
  uploadTime: string;
  image: string;
}
