import Image from 'next/image';
import { shimmer, toBase64 } from '../lib/image-shimmer';
import styles from '../styles/picture.module.scss';

export default function PictureFullscreen({id, close, prev, next}) {
    return (
        <>
            <div className={styles.imageOverlayContainer}>
                <div className={styles.closeImageOverlay} onClick={() => close()}>x</div>
                <div className={styles.previousImageOverlay} onClick={() => prev()}>&lt;</div>
                <div className={styles.nextImageOverlay} onClick={() => next()}>&gt;</div>
                <div className={styles.imageOverlay}>
                    <Image src={`https://i.imgur.com/${id}.png`}
                           layout={'fill'}
                           placeholder="blur"
                           blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1280, 720))}`}
                           objectFit={'contain'} />
                </div>
            </div>
        </>
    );
}
