import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const NotificationSchema = new mongoose.Schema({
  user:String,
  notifications:[{
      user2:String,
      status:String
  }]
});
