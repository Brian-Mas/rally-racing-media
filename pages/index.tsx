import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';

export default function Home() {
    return (
        <>
            <Head>
                <title>Rally Racing Media</title>
            </Head>
            <div className={styles.container}>
                <Image src={'/RallyRacingMedia.svg'} width={256} height={100}></Image>
                <h2>Coming soon</h2>
            </div>
        </>
    );
}
