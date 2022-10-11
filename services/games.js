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
    allGames: (page) => `/games?key=${API_KEY}&page_size=15&page=${page}`,
    allGamesWithSearch: (search, page) => `/games?key=${API_KEY}&page_size=15&search=${search}&page=${page}`,
    getById: (gameId) => `/games/${gameId}?key=${API_KEY}`,
    allGamesByPlatform: (platformId, page) => `/games?key=${API_KEY}&platforms=${platformId}&page_size=15&page=${page}`,
    allGamesByPlatformWithSeacrh: (platformId, search, page) =>
        `/games?key=${API_KEY}&platforms=${platformId}&search=${search}&page_size=15&page=${page}`,
    gameStores: (gameId) => `/games/${gameId}/stores?key=${API_KEY}`,
};

const getAllGames = async (search, page) => {
    let response;

    if (search != undefined) {
        response = await fetch(host + endpoints.allGamesWithSearch(search, page), OPTIONS);
    } else {
        response = await fetch(host + endpoints.allGames(page), OPTIONS);
    }

    return await response.json();
};

const gameById = async (gameId) => {
    const response = await fetch(host + endpoints.getById(gameId), OPTIONS);
    return await response.json();
};

const gamesByPlatform = async (platformId, search, page) => {
    let response;

    if (search != undefined) {
        response = await fetch(host + endpoints.allGamesByPlatformWithSeacrh(platformId, search, page), OPTIONS);
    } else {
        response = await fetch(host + endpoints.allGamesByPlatform(platformId, page), OPTIONS);
    }

    return await response.json();
};

const gameStores = async (gameId) => {
    const response = await fetch(host + endpoints.gameStores(gameId), OPTIONS);

    const data = await response.json();
    return data.results;
};

export { getAllGames, gameById, gamesByPlatform, gameStores };
