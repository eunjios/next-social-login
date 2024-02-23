import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/user';
import { LoginStatus } from '@/types/user';

const useUserProfile = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile,
    enabled: status === 'authenticated', // enabled to authenticated user
  });

  const { user } = data ?? {};

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    await signOut({ redirect: false });
    await router.replace('/auth');
    setIsLoggingOut(false);
  };

  let loginStatus: LoginStatus = 'unauthenticated';
  if (isLoading || status === 'loading') {
    loginStatus = 'loggingIn'; // 로그인 중 (데이터 가져오는 중)
  } else if (status === 'unauthenticated' && isLoggingOut) {
    loginStatus = 'loggingOut'; // 로그아웃 중 (세션 삭제 중)
  } else if (status === 'unauthenticated') {
    loginStatus = 'unauthenticated';
  } else {
    loginStatus = 'authenticated';
  }

  return {
    loginStatus,
    session,
    status,
    user,
    isLoading,
    error,
    logout,
  };
};

export default useUserProfile;
