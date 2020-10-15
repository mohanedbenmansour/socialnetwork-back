import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ProfileSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  //header
  headline: { type: String },
  picture: { type: String },
  //BASIC INFORMATION
  dateOfBirth: { type: String },
  gender: String,
  //CONTACT INFORMATION
  mobilephone: String,
  facebook: String,
  website: String,
  adress: String,
  //WORK AND EDUCATION
  work: String,
  education: String,
  skills: String,
});
