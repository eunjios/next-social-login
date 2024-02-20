import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { BarLoader } from 'react-spinners';
import Thumbnail from '../ui/Thumbnail';
import styles from './User.module.css';
import Link from 'next/link';

export default function User({ data }: { data: Session }) {
  const { data: session, status } = useSession();

  // 소셜 로그인 후 초기 로딩
  if (status === 'loading') {
    return null;
  }

  // 로그아웃 클릭 후 /auth 로 이동 전
  if (!session) {
    return (
      <div className={styles.container}>
        <p className={styles.text}>로그아웃 중...</p>
        <BarLoader color="#aeaeae" speedMultiplier={0.5} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Thumbnail src={data.user?.image} size={160} />
      <div className={styles.name}>{data.user?.name}</div>
      <p className={styles.msg}>{data.user?.message}</p>
      <div className={styles.actions}>
        <Link className={styles.edit} href="/profile">
          프로필 편집
        </Link>
      </div>
    </div>
  );
}
