import { signIn } from 'next-auth/react';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import styles from './Socials.module.css';

export default function Socials() {
  const login = async (provider: string) => {
    try {
      const result = await signIn(provider, { redirect: false });
      console.log(result);
    } catch (error) {
      console.error('Error occurred during signIn:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.naver}>
        <button className={styles.button} onClick={() => login('naver')}>
          <SiNaver size={16} color="#fff" />
          <span>네이버로 시작하기</span>
        </button>
      </div>
      <div className={styles.kakao} onClick={() => login('kakao')}>
        <button className={styles.button}>
          <RiKakaoTalkFill size={24} />
          <span>카카오로 시작하기</span>
        </button>
      </div>
      <div className={styles.google}>
        <button className={styles.button} onClick={() => login('google')}>
          <FcGoogle size={24} />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
