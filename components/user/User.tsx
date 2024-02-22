import Link from 'next/link';
import Thumbnail from '../ui/Thumbnail';
import useUserProfile from '@/hooks/useUserProfile';
import styles from './User.module.css';

export default function User() {
  const { user, isLoading, error } = useUserProfile();

  if (error) {
    throw new Error('Could not fetch user data (/)');
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Thumbnail src={user?.image} size={160} />
      <div className={styles.name}>{user?.name}</div>
      <p className={styles.msg}>{user?.message}</p>
      <div className={styles.actions}>
        <Link className={styles.edit} href="/profile">
          프로필 편집
        </Link>
      </div>
    </div>
  );
}
