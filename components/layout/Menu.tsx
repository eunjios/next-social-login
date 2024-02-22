import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Thumbnail from '../ui/Thumbnail';
import styles from './Menu.module.css';

export default function Menu() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const btnStyle = `${styles.btn} ${isLoggingOut && styles.loading}`; // 로그아웃 중일 때 스타일 변경

  const logoutHanlder = async () => {
    setIsLoggingOut(true);
    await signOut({ redirect: false });
    await router.replace('/auth');
    setIsLoggingOut(false);
  };

  if (!session) {
    return (
      <Link className={btnStyle} href="/auth">
        로그인
      </Link>
    );
  }

  return (
    <>
      <button className={btnStyle} onClick={logoutHanlder}>
        로그아웃
      </button>
      <Link href="/profile">
        <Thumbnail src={session?.user?.image} size={40} />
      </Link>
    </>
  );
}
