import { ProfileDTO } from './profile.dto';
import { ProfileModule } from './profile.module';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/types/profile';
import { User } from '../types/user';
import { match } from 'assert';
@Injectable()
export class ProfileService {
  constructor(@InjectModel('Profile') private profileModel: Model<Profile>) {}

  async initProfile(userId: string) {
    const profile = await this.profileModel.create({
      user: userId,
      picture: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      headline: '',

      dateOfBirth: '',
      gender: '',

      mobilephone: '',
      facebook: '',
      website: '',
      adress: '',
    });
    return await profile.save();
  }

  async updateHeader(userId: string, url: string, profiledto: ProfileDTO) {
    const filter = { user: userId };
    const update = { picture: url, headline: profiledto.headline };
    let doc = await this.profileModel.findOneAndUpdate(filter, update);

    doc = await this.profileModel.findOne(filter);
    return doc;
  }

  async updateMobilePhone(userId: string, profiledto: ProfileDTO) {
    const filter = { user: userId };
    const update = { mobilephone: profiledto.mobilephone };
    let doc = await this.profileModel.findOneAndUpdate(filter, update);
    doc = await this.profileModel.findOne(filter);
    return doc;
  }

  async updateFacebook(userId: string, profiledto: ProfileDTO) {
    const filter = { user: userId };
    const update = { facebook: profiledto.facebook };
    let doc = await this.profileModel.findOneAndUpdate(filter, update);
    //doc = await this.profileModel.findOne(filter);
    return doc;
  }
  async updateWebsite(userId: string, profiledto: ProfileDTO) {
    const filter = { user: userId };
    const update = { website: profiledto.website };
    let doc = await this.profileModel.findOneAndUpdate(filter, update);
    doc = await this.profileModel.findOne(filter);
    return doc;
  }
  async updateAdress(userId: string, profiledto: ProfileDTO) {
    const filter = { user: userId };
    const update = { adress: profiledto.adress };
    let doc = await this.profileModel.findOneAndUpdate(filter, update);
    doc = await this.profileModel.findOne(filter);
    return doc;
  }
  async updateDateOfBirth(userId: string, profiledto: ProfileDTO) {
    const filter = { user: userId };
    const update = { dateOfBirth: profiledto.dateOfBirth };
    let doc = await this.profileModel.findOneAndUpdate(filter, update);
    doc = await this.profileModel.findOne(filter);
    return doc;
  }
  async updateGender(userId: string, profiledto: ProfileDTO) {
    const filter = { user: userId };
    const update = { gender: profiledto.gender };
    let doc = await this.profileModel.findOneAndUpdate(filter, update);
    doc = await this.profileModel.findOne(filter);
    return doc;
  }
  async updateWork(userId: string, profiledto: ProfileDTO) {
    const filter = { user: userId };
    const update = { work: profiledto.work };
    let doc = await this.profileModel.findOneAndUpdate(filter, update);
    doc = await this.profileModel.findOne(filter);
    return doc;
  }
  async updateEducation(userId: string, profiledto: ProfileDTO) {
    const filter = { user: userId };
    const update = { education: profiledto.education };
    let doc = await this.profileModel.findOneAndUpdate(filter, update);
    doc = await this.profileModel.findOne(filter);
    return doc;
  }
  async updateSkills(userId: string, profiledto: ProfileDTO) {
    const filter = { user: userId };
    const update = { skills: profiledto.skills };
    let doc = await this.profileModel.findOneAndUpdate(filter, update);
    doc = await this.profileModel.findOne(filter);
    return doc;
  }
  async getProfile(userId: string) {
    let profile = await this.profileModel
      .find({ user: userId })
      .populate('user');
    return profile;
  }
  async getSearchResut(userName, userid) {
    let profiles = await this.profileModel.find({}).populate({
      path: 'user',
      match: {
        firstName: userName,
        _id: { $ne: userid },
      },
    });
    return profiles.filter(item => item.user != null);
  }
  async getProfileSuggestion(headline:string) {
    let profile = await this.profileModel
      .find({ headline: headline })
      .populate('user');
    return profile;
  }
}
