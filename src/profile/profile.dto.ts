import { User } from 'src/types/user';

export interface ProfileDTO {
  user: string;
  picture: string;
  headline: string;

  dateOfBirth: string;
  gender: string;

  mobilephone: string;
  facebook: string;
  website: string;
  adress: string;

  work: string;
  education: string;
  skills: string;
}
