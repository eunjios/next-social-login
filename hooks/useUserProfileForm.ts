import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import queryClient from '@/store/queryClient';
import { editUserProfile } from '@/api/user';
import { NewProfile, UserProfileResponse } from '@/api/user/types';

const useUserProfileForm = (initialFormData?: NewProfile) => {
  const router = useRouter();
  const [formData, setFormData] = useState<NewProfile>(
    initialFormData ?? {
      message: '',
      email: '',
    }
  );

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const { mutate } = useMutation({
    mutationFn: (newProfile: NewProfile) => editUserProfile(newProfile),
    onMutate: async (newProfile: NewProfile) => {
      await queryClient.cancelQueries({ queryKey: ['user'] });
      const prevUserData = queryClient.getQueryData<UserProfileResponse>([
        'user',
      ]);
      queryClient.setQueryData(['user'], (prevData: UserProfileResponse) => {
        return {
          ...prevData,
          user: {
            ...prevData.user,
            ...newProfile,
          },
        };
      });
      return { prevUserData };
    },
    onError(error, user, context) {
      queryClient.setQueryData(['user'], context?.prevUserData);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const editProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    const newProfile = formData;
    mutate(newProfile);
    router.replace('/');
  };

  return {
    formData,
    inputChangeHandler,
    editProfile,
  };
};

export default useUserProfileForm;
