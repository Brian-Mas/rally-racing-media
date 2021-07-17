import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.scss'


export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <Link href={'/'}>
                    <a className={styles.logo}>
                        <Image src={'/RallyRacingMediaExtended.svg'} width={150} height={60}></Image>
                    </a>
                </Link>
            </div>
        </>
    )
}
