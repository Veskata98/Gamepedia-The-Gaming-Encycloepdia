import { XRapidAPIKey, VIDEOGAMES_NEWS_API_HOST } from './APICalls.js';

const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': XRapidAPIKey,
        'X-RapidAPI-Host': VIDEOGAMES_NEWS_API_HOST,
    },
};

const host = 'https://videogames-news2.p.rapidapi.com/videogames_news';

const endpoints = {
    allNews: '/recent',
};

const getNews = async () => {
    const news = await fetch(host + endpoints.allNews, OPTIONS);
    return await news.json();
};

export { getNews };
