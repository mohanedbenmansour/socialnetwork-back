import { User } from 'src/types/user';

export interface RequestDTO {
  user: string;
  notification: [{
      user2:string,
      status:string
  }];
}
