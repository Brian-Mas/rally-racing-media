import Image from 'next/image';
import styles from '../styles/Article.module.scss';

export default function ArticlePreview({ article }) {
    return (
        <div className={styles.article}>
            <div className={styles.image}>
                <Image src={`https://i.imgur.com/${article.cover}.png`}
                       quality={25}
                       layout={'fill'}
                       objectFit={'cover'} />
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{article.title}</div>
                <div className={styles.date}>{article.date}</div>
            </div>
        </div>
    );
}
