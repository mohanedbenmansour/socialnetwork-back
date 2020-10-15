import { User } from 'src/types/user';

export interface UserDTO {
  firstName: string;
  lastName: string;
  email:string;
  password: string;
  friends: [string];
}