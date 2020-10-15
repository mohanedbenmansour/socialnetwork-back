import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const MessageSchema = new mongoose.Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
});
