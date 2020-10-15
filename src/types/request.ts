import { Document } from 'mongoose';

export interface Request extends Document {
  requester: String;

  recipient: String;

  status: Number;
}
