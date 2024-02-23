import Link from 'next/link';
import Thumbnail from '../ui/Thumbnail';
import useUserProfile from '@/hooks/useUserProfile';
import styles from './Menu.module.css';

export default function Menu() {
  const { loginStatus, user, error, logout } = useUserProfile();

  const btnStyle = `${styles.btn} ${(loginStatus === 'loggingOut' || loginStatus === 'loggingIn') && styles.loading}`; // 로그아웃 중일 때 스타일 변경

  // TODO: ERROR UI
  if (error) {
    // throw new Error('could not fetch user data. (in menu)');
    return <p>에러</p>;
  }

  if (loginStatus !== 'authenticated') {
    return (
      <Link className={btnStyle} href="/auth">
        로그인
      </Link>
    );
  }

  return (
    <>
      <button className={btnStyle} onClick={logout}>
        로그아웃
      </button>
      <Link href="/profile">
        <Thumbnail src={user?.image} size={40} />
      </Link>
    </>
  );
}
