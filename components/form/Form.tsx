import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import styles from './Form.module.css';

export default function Form() {
  return (
    <div className={styles.form}>
      <div className={styles.naver}>
        <button
          className={styles.button}
          onClick={() => signIn('naver', { redirect: true, callbackUrl: '/' })}
        >
          <SiNaver size={16} color="#fff" />
          <span>네이버로 시작하기</span>
        </button>
      </div>
      <div
        className={styles.kakao}
        onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/' })}
      >
        <button className={styles.button}>
          <RiKakaoTalkFill size={24} />
          <span>카카오로 시작하기</span>
        </button>
      </div>
      <div className={styles.google}>
        <button
          className={styles.button}
          onClick={() => signIn('google', { redirect: true, callbackUrl: '/' })}
        >
          <FcGoogle size={24} />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
