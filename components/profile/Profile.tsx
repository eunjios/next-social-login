import Thumbnail from '../ui/Thumbnail';
import useUserProfile from '@/hooks/useUserProfile';
import styles from './Profile.module.css';

export default function Profile() {
  const { user, isLoading, error, formData, changeHandler, submitHandler } =
    useUserProfile();

  if (error) {
    throw new Error('Could not fetch user data (/profile)');
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Thumbnail src={user?.image} size={160} />
      <h2 className={styles.name}>{user?.name}</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.section}>
          <label htmlFor="message">상태 메시지</label>
          <input
            type="text"
            id="message"
            value={formData.message}
            onChange={changeHandler}
          />
          <p>상태 메시지를 설정해 보세요</p>
        </div>
        <div className={styles.section}>
          <label htmlFor="email">이메일 수정</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <p>아직 유효성 검사는 안 하지만, 이메일을 등록하세요.</p>
        </div>
        <div className={styles.actions}>
          <button>수정하기</button>
        </div>
      </form>
    </div>
  );
}
