import { format, parseISO } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { ArticleData } from '../../../classes/article-data';
import { Picture } from '../../../classes/picture';
import PictureFullscreen from '../../../components/picture-fullscreen';
import { getAllArticlesPaths, getArticleData } from '../../../lib/articles';
import { shimmer, toBase64 } from '../../../lib/image-shimmer';
import { getImgurPictures } from '../../../lib/imgur-pictures';
import styles from '../../../styles/article.module.scss';

export default function Post({ props, _articleData, _pictures }) {
    const [activeIndex, setActiveIndex] = React.useState(null);
    const isAPictureActive = activeIndex !== null;
    const articleData: ArticleData = _articleData;
    const pictures: Picture[] = _pictures;

    const selectPicture = (a) => {
        setActiveIndex(a);
    };

    const prev = () => {
        let index = activeIndex - 1;
        if (index < 0) { index = pictures.length - 1; }

        setActiveIndex(index);
    };

    const close = () => {
        setActiveIndex(null);
    };

    const next = () => {
        let index = activeIndex + 1;
        if (index >= pictures.length) { index = 0; }

        setActiveIndex(index);
    };

    return (
        <>
            <Head>
                <title>{articleData.title} - {format(parseISO(articleData.date), 'yyyy')}</title>
            </Head>
            <div className={`${styles.pageContainer} ${isAPictureActive ? '' : styles.overflow}`}>
                <article className={styles.container}>
                    <div className={styles.details}>
                        <div className={styles.title}>{articleData.title}</div>
                        <span className={styles.date}>{articleData.date}</span>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />


                    <h1>Pictures</h1>
                    <div className={styles.gallery}>
                        {pictures.map((p, index) => {
                            return (
                                <div className={styles.picture}
                                     key={index}>
                                    <Image src={p.link}
                                           alt={articleData.title + '_' + index}
                                           layout={'fill'}
                                           objectFit={'cover'}
                                           quality={40}
                                           placeholder="blur"
                                           blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1280, 720))}`}
                                           onClick={() => { selectPicture(index); }} />
                                </div>
                            );
                        })}
                    </div>
                </article>
            </div>

            {isAPictureActive &&
            <PictureFullscreen id={pictures[activeIndex].id}
                               prev={prev}
                               close={close}
                               next={next} />
            }
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    return {
        paths: getAllArticlesPaths(),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const articleData = await getArticleData(params.year as string, params.article as string);
    const pictures = await getImgurPictures(articleData.albumId);

    return {
        props: {
            _articleData: articleData,
            _pictures: pictures
        }
    };
};
