import Image from 'next/image';
import { Article } from '../classes/article';
import { shimmer, toBase64 } from '../lib/image-shimmer';
import styles from '../styles/article-preview.module.scss';

export default function ArticlePreview({ _article }) {
    const article: Article = _article;

    return (
        <div className={styles.article}>
            <div className={styles.image}>
                <Image src={`https://i.imgur.com/${article.cover}.png`}
                       alt={article.title}
                       quality={25}
                       layout={'fill'}
                       placeholder="blur"
                       blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1280, 720))}`}
                       objectFit={'cover'} />
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{article.title}</div>
                <div className={styles.date}>{article.date}</div>
            </div>
        </div>
    );
}
