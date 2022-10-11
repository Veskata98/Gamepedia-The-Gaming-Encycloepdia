import { rawgAPIKey, RAWG_API_HOST, XRapidAPIKey } from './APICalls.js';

const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': XRapidAPIKey,
        'X-RapidAPI-Host': RAWG_API_HOST,
    },
};

const API_KEY = rawgAPIKey();

const host = 'https://rawg-video-games-database.p.rapidapi.com';

const endpoints = {
    allPlatforms: `/platforms?key=${API_KEY}`,
    platformById: (platformId) => `/platforms/${platformId}?key=${API_KEY}`,
    topRatedGamesByPlatform: (platformId) =>
        `/games?key=${API_KEY}&platforms=${platformId}&ordering=-rating&page_size=20`,
};

const getPlatforms = async () => {
    const response = await fetch(host + endpoints.allPlatforms, OPTIONS);
    const data = await response.json();
    return data.results;
};

const platformById = async (platformId) => {
    const response = await fetch(host + endpoints.platformById(platformId), OPTIONS);

    const data = await response.json();

    //Removing HTML Tags and Special Elements from Platform descriptions
    let descr = data.description;
    descr = descr.replace(/(&nbsp;|<([^>]+)>)/gi, '');
    descr = descr.replace(/&#39;/gm, "'");
    data.description = descr;

    return data;
};

const topRatedGamesByPlatform = async (platformId) => {
    const response = await fetch(host + endpoints.topRatedGamesByPlatform(platformId), OPTIONS);

    const data = await response.json();

    //Filtering and removing games with adult content
    const result = data.results.filter((x) => x.esrb_rating?.id != 5).slice(0, 10);

    return result;
};

export { getPlatforms, platformById, topRatedGamesByPlatform };
