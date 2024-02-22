import { IUser } from '@/types/user';

export interface UserProfileResponse {
  message: string;
  user: IUser;
}

export interface NewProfile {
  message?: string;
  email?: string;
}
