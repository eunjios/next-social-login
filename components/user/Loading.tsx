import styles from './Loading.module.css';

export default function UserLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnail} />
      <div className={styles.name} />
      <div className={styles.msg}></div>
      <div className={styles.actions}>
        <div className={styles.edit} />
      </div>
    </div>
  );
}
