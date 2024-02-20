import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { BarLoader } from 'react-spinners';
import styles from './User.module.css';

export default function User() {
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
      <div className={styles.thumbnail}>
        <Image
          src={session.user?.image ?? ''}
          alt="프로필"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className={styles.name}>{session.user?.name}</div>
      <div className={styles.actions}>
        <button className={`${styles.logout}`} onClick={() => {}}>
          프로필 편집
        </button>
      </div>
    </div>
  );
}
