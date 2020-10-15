import { Document } from 'mongoose';

export interface Profile extends Document {
  readonly user: string;
  readonly picture:string;
  readonly cover: string;
  readonly headline:string,
  readonly currentPosition:string,
  readonly country:string,
  readonly location:string,
  readonly industry:string,

  readonly work:string,
  readonly education:string,
  readonly skills:string
 
}