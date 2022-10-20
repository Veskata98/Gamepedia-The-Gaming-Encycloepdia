import { XRapidAPIKey, VIDEOGAMES_NEWS_API_HOST, PLATFORMS_NEWS_API_HOST } from './APICalls.js';

const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': XRapidAPIKey,
        'X-RapidAPI-Host': VIDEOGAMES_NEWS_API_HOST,
    },
};

const OPTIONS_PLATFORMS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': XRapidAPIKey,
        'X-RapidAPI-Host': PLATFORMS_NEWS_API_HOST,
    },
};

const host = 'https://videogames-news2.p.rapidapi.com/videogames_news';
const platforms_host = 'https://gaming-news.p.rapidapi.com/news';

const endpoints = {
    allNews: '/recent',
    platformNews: '/',
};

const getNews = async () => {
    const news = await fetch(host + endpoints.allNews, OPTIONS);
    return await news.json();
};

const platformNews = async () => {
    const news = await fetch(platforms_host + endpoints.platformNews, OPTIONS_PLATFORMS);
    return await news.json();
};

export { getNews, platformNews };
