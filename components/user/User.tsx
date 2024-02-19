import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import styles from './User.module.css';

export default function User() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
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
          <button className={`${styles.logout}`} onClick={() => signOut()}>
            로그아웃
          </button>
        </div>
      </div>
    );
  }

  return null;
}
