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
    const date = parseISO(articleData.date);

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
                <title>{articleData.title} - {format(date, 'yyyy')}</title>

                {/*Primary Meta Tags*/}
                <title>{articleData.title} - {format(date, 'yyyy')}</title>
                <meta name="title" content={`${articleData.title} - ${format(date, 'yyyy')}`} />
                <meta name="description" content={articleData.description} />

                {/*Open Graph / Facebook*/}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://rallyracingmedia.com/${format(date, 'yyyy')}/${articleData.title}`} />
                <meta property="og:title" content={articleData.title} />
                <meta property="og:description" content={articleData.description} />
                <meta property="og:image" content={`https://i.imgur.com/${articleData.cover}.png`} />

                {/*Twitter*/}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://rallyracingmedia.com/${format(date, 'yyyy')}/${articleData.title}`} />
                <meta property="twitter:title" content={articleData.title} />
                <meta property="twitter:description" content={articleData.description} />
                <meta property="twitter:image" content={`https://i.imgur.com/${articleData.cover}.png`} />
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
                                    <div className={styles.logoOverlay}>
                                        <Image src={'/RallyRacingMedia.svg'}
                                               alt="Rally Racing Media logo"
                                               width={100}
                                               height={60} />
                                    </div>
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
