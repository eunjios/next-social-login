export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  message?: string;
}

export type LoginStatus =
  | 'unauthenticated'
  | 'authenticated'
  | 'loggingIn'
  | 'loggingOut';
