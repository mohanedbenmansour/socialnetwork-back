import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const Schema=mongoose.Schema;
export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:{type:String,required:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});