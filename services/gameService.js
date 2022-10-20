import { rawgAPIKey, RAWG_API_HOST, XRapidAPIKey } from './APICalls.js';

const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': XRapidAPIKey,
        'X-RapidAPI-Host': RAWG_API_HOST,
    },
};

const API_KEY = rawgAPIKey();

const host = 'https://rawg-video-games-database.p.rapidapi.com/games';

const endpoints = {
    allGames: (page) => `?key=${API_KEY}&page_size=15&page=${page}`,
    allGamesWithSearch: (search, page) => `?key=${API_KEY}&page_size=15&search=${search}&page=${page}`,
    getById: (gameId) => `/${gameId}?key=${API_KEY}`,
    gameTrailer: (gameId) => `/${gameId}/movies?key=${API_KEY}`,
    allGamesByPlatform: (platformId, page) => `?key=${API_KEY}&platforms=${platformId}&page_size=15&page=${page}`,
    allGamesByPlatformWithSeacrh: (platformId, search, page) =>
        `?key=${API_KEY}&platforms=${platformId}&search=${search}&page_size=15&page=${page}`,

    allGamesByGenre: (genreId, page) => `?key=${API_KEY}&genre=${genreId}&page_size=15&page=${page}`,
    allGamesByGenreWithSeacrh: (genreId, search, page) =>
        `?key=${API_KEY}&genre=${genreId}&search=${search}&page_size=15&page=${page}`,

    gameStores: (gameId) => `/${gameId}/stores?key=${API_KEY}`,
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

const gameTrailer = async (gameId) => {
    const response = await fetch(host + endpoints.gameTrailer(gameId), OPTIONS);
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

const gamesByGenre = async (genreId, search, page) => {
    let response;

    if (search != undefined) {
        response = await fetch(host + endpoints.allGamesByGenreWithSeacrh(genreId, search, page), OPTIONS);
    } else {
        response = await fetch(host + endpoints.allGamesByGenre(genreId, page), OPTIONS);
    }

    return await response.json();
};

const gameStores = async (gameId) => {
    const response = await fetch(host + endpoints.gameStores(gameId), OPTIONS);

    const data = await response.json();
    return data.results;
};

export { getAllGames, gameById, gameTrailer, gamesByPlatform, gamesByGenre, gameStores };
