import { ProfileService } from '../profile/profile.service';
import { Profile } from '../types/profile';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../types/user';
import { Payload } from 'src/types/payload';
import { Request } from 'src/types/request';

import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Profile') private ProfileModel: Model<Profile>,
    @InjectModel('Request') private requestModel: Model<Request>,
    @InjectModel('Notification') private notificationModel: Model<Request>,


    private profileService: ProfileService,
  ) {}

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  async create(UserDTO: RegisterDTO) {
    const { email } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(UserDTO);
 this.initNotif(createdUser._id)
    this.profileService.initProfile(createdUser._id);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  private sanitizeUser(user: User) {
    return user.depopulate('password');
  }
  async addFriend(requester: string, recipient: string) {
    const filter = { _id: requester };
    const update = { $push: { friends: recipient } };
    await this.userModel.findOneAndUpdate(filter, update);

    const filter2 = { _id: recipient };
    const update2 = { $push: { friends: requester } };
    await this.userModel.findOneAndUpdate(filter2, update2);
  }
  //friend requests
  async sendRequest(requester: string, recipient: string) {
    const createdRequest = new this.requestModel({
      requester: requester,
      recipient: recipient,
      status: 0,
    });
    this.addNotification(recipient,requester,"0")
    return await createdRequest.save();
  }

  async rejectRequest(requester: string, recipient: string) {
    const filter = { requester: recipient, recipient: requester };
    return await this.requestModel.findOneAndDelete(filter);
  }
  async acceptRequest(requester: string, recipient: string) {
    const filter = { requester: recipient, recipient: requester };
    const update = { status: 1 };
    let doc = await this.requestModel.findOneAndUpdate(filter, update);
    this.addNotification(recipient,requester,"1")

    this.addFriend(requester, recipient);
    return doc;
  }
  async returnStatus(requester: string, recipient: string) {
    const request = await this.requestModel.findOne({
      requester: requester,
      recipient: recipient,
    });
    if (!request) {
      const request1 = await this.requestModel.findOne({
        requester: recipient,
        recipient: requester,
      });
      if (!request1) return null;
      if (request1.status == 1) return 1;
      else if (request1.status == 0) return -1;
    }
    return request.status;
  }
  async getFriends(id: string) {
    const users = await this.userModel.find(
      {
        _id: id,
      },
      {
        friends: 1,
        _id: 0,
      },
    );
    return users;
  }

  async addNotification(user:string,user2:string,status:string){
    const filter = { user: user};
    const notif={
      user2:user2,
      status:status
    }
    const update = { $push: { notifications: notif } };
   let doc=await this.notificationModel.findOneAndUpdate(filter, update);
   console.log(doc)
  }
  async initNotif(user:string){
        const createdUser = new this.notificationModel({user:user});  
       return await createdUser.save();

  }
  async getNotifs(user:string){
    const users = await this.notificationModel.find(
      {
        user:user,
      }
    );
    return users;
  }
  async deleteNotifs(user:string){
    const filter = { user: user};
   
    const update = {$set: {notifications: []}};
    let doc=await this.notificationModel.findOneAndUpdate(filter, update);
    return doc;
  }
}
