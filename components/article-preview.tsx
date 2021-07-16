import Image from 'next/image';
import styles from '../styles/Article.module.scss'

export default function ArticlePreview({ article }) {
    return (
        <div className={styles.article}>
            <Image className={styles.image} src={`https://i.imgur.com/${article.cover}.png`} width={248.89} height={140} />
            <div className={styles.details}>
                <div className={styles.title}>{article.title}</div>
                <div className={styles.date}>{article.date}</div>
            </div>
        </div>
    )
}
