import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Article } from '../classes/article';
import ArticlePreview from '../components/article-preview';
import { getRecentArticles } from '../lib/articles';
import styles from '../styles/Home.module.scss';

export default function Home({ _articles }) {
    const articles: Article[] = _articles;

    return (
        <div className={styles.container}>
            <Head>
                <title>Rally Racing Media</title>
                <meta name="title" content='Rally racing media' />
                <meta name="description" content='Home of rally racing media where you can find the latest pictures & videos of our visited rallys.' />
                <link rel="icon"
                    href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.grid}>
                    {articles.map((a, index) => {
                        return (
                            <Link href={`${a.link}`} key={index}>
                                <a>
                                    <ArticlePreview _article={a} />
                                </a>
                            </Link>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const articles = await getRecentArticles();
    return {
        props: {
            _articles: articles
        }
    };
};
