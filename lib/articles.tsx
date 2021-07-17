import fs from 'fs';
import path from 'path';
import { articleYearsDirectory } from './years';

export const getRecentArticles = async (amount = 10) => {
    const years = getYears();
    const articles = [];

    while (articles.length <= 10 && years.length) {
        const articlesPerYear = getArticlesInfoForYear(years[years.length - 1]);
        articles.push(
            ...(articlesPerYear.slice(0, Math.min(articlesPerYear.length, amount)))
        );
        years.splice(-1, 1);
    }

    return articles;
}

const getYears = () => {
    return fs.readdirSync(articleYearsDirectory);
}

const getArticlesInfoForYear = (year: string) => {
    const directory = path.join(articleYearsDirectory, year, `${year}.json`);
    const data = JSON.parse('' + fs.readFileSync(directory));
    let articles = data?.items;
    if (articles?.length) {
        articles = articles.map(a => ({
            ...a,
            link: `${year}/${a.title.toLowerCase()}`
        }))
    }
    return articles;
}
