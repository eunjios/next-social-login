import axios from 'axios';
import { NewProfile, UserProfileResponse } from './types';

const api = axios.create({
  baseURL: 'http://localhost:3000', // dev mode
});

export const getUserProfile = async () => {
  const response = await api.get<UserProfileResponse>('/api/user/profile');
  return response.data;
};

export const editUserProfile = async (newProfile: NewProfile) => {
  const response = await api.patch('/api/user/profile', newProfile);
  return response.data;
};
