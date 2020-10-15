import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const PostSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  uploadTime: String,
  content: String,
  image: String,
  userImage:String
});
