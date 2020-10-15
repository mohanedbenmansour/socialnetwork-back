import { ProfileService } from './../profile/profile.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { ProfileSchema } from 'src/models/profile.schema';
import { RequestSchema } from 'src/models/request.schema';
import { NotificationSchema } from 'src/models/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
  ],
  providers: [UserService, ProfileService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
