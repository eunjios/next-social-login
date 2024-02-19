import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import classes from './Form.module.css';

export default function Form() {
  return (
    <form className={classes.form}>
      <div className={classes.naver}>
        <button className={classes.button}>
          <SiNaver size={16} color="#fff" />
          <span>네이버로 시작하기</span>
        </button>
      </div>
      <div className={classes.kakao}>
        <button className={classes.button}>
          <RiKakaoTalkFill size={24} />
          <span>카카오로 시작하기</span>
        </button>
      </div>
      <div className={classes.google}>
        <button className={classes.button}>
          <FcGoogle size={24} />
          <span>Sign in with Google</span>
        </button>
      </div>
    </form>
  );
}
