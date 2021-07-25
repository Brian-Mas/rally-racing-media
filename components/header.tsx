import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.scss';

export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <Link href={'/'}>
                    <a className={styles.logo}>
                        <Image src={'/RallyRacingMediaExtended.svg'}
                               alt='Rally Racing Media logo'
                               width={150}
                               height={60} />
                    </a>
                </Link>
            </div>
        </>
    );
}
