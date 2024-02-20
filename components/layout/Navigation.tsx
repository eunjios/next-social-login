import Link from 'next/link';
import Menu from './Menu';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.title}>
        <Link href="/">소셜 로그인 연습</Link>
      </div>
      <div className={styles.menu}>
        <Menu />
      </div>
    </nav>
  );
}
