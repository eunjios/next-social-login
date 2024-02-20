import Socials from './Socials';
import styles from './Form.module.css';

export default function Form() {
  return (
    <>
      <div className={styles.title}>
        <h2>로그인</h2>
      </div>
      <Socials />
    </>
  );
}
