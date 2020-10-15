import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
//serve static
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MessageModule } from './message/message.module';
import { MessagesGateway } from './message/message.gateway';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    AuthModule,
    ProfileModule,
    PostModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // <-- path to the static files
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [MessagesGateway],
})
export class AppModule {}
