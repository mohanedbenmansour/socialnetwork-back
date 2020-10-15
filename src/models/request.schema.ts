import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const RequestSchema = new mongoose.Schema({
  requester: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});
