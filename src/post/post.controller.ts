import { PostDTO } from './post.dto';
import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string = file.originalname;

      cb(null, `${filename}`);
    },
  }),
};
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get('getposts')
  async readAllPosts() {
  

    return this.postService.readPosts();
  }
  @Post('create')
  @UseInterceptors(FileInterceptor('image', storage))
  async createPost(@Body() postDTO: PostDTO, @UploadedFile() file, @Req() req) {
    const url =
      req.protocol + '://' + req.get('host') + '/' + file.originalname;
    // '/uploads/postimages/' +

    const post = await this.postService.createPost(postDTO, url);

    return { post };
  }
}
