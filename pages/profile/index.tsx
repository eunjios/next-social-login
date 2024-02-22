import { GetServerSideProps } from 'next';
import {
  // Session,
  getServerSession,
} from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Profile from '@/components/profile/Profile';

export default function ProfilePage() {
  return <Profile />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: session,
    },
  };
};
