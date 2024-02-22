import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { editUserProfile, getUserProfile } from '@/api/user';
import { NewProfile } from '@/api/user/types';

const useUserProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile,
  });
  const { user } = data ?? {};
  const [formData, setFormData] = useState<NewProfile>({
    message: user?.message ?? '',
    email: user?.email ?? '',
  });

  const router = useRouter();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const newProfile = formData;
    await editUserProfile(newProfile);
    router.replace('/');
  };

  return {
    user,
    isLoading,
    error,
    formData,
    changeHandler,
    submitHandler,
  };
};

export default useUserProfile;
