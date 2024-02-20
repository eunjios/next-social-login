import { FormEvent, useState } from 'react';
import { Session } from 'next-auth';
import axios from 'axios';
import { useRouter } from 'next/router';
import Thumbnail from '../ui/Thumbnail';
import styles from './Profile.module.css';

import { ChangeProfile } from '@/pages/api/user/profile';

export default function Profile({ data }: { data: Session }) {
  const router = useRouter();
  const [enteredMessage, setEnteredMessage] = useState(
    data.user?.message ?? ''
  );
  const [enteredEmail, setEnteredEmail] = useState(data.user?.email ?? '');

  const messageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredMessage(event.target.value);
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const newProfile: ChangeProfile = {
      message: enteredMessage,
      email: enteredEmail,
    };

    const response = await axios.patch('/api/user/profile', newProfile);
    const data = response.data;

    console.log('변경된 유저 데이터', data.user); // test

    router.replace('/');
  };

  return (
    <div className={styles.container}>
      <Thumbnail src={data.user?.image} size={160} />
      <h2 className={styles.name}>{data.user?.name}</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.section}>
          <label htmlFor="message">상태 메시지</label>
          <input
            type="text"
            id="message"
            value={enteredMessage}
            onChange={messageChangeHandler}
          />
          <p>상태 메시지를 설정해 보세요</p>
        </div>
        <div className={styles.section}>
          <label htmlFor="email">이메일 수정</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
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
