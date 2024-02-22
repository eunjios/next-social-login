import Image from 'next/image';
import styles from './Thumbnail.module.css';

interface Props {
  size: string | number;
  src?: string | null;
}

export default function Thumbnail({ size, src }: Props) {
  return (
    <div className={styles.thumbnail} style={{ width: size, height: size }}>
      <Image
        src={
          src ??
          'https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png'
        }
        alt="썸네일"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        priority
      />
    </div>
  );
}
