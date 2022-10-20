import { Router } from 'express';
import { gameById, gameStores, getAllGames, gamesByPlatform, gameTrailer } from '../services/gameService.js';

const gamesController = Router();

const STORES = {
    1: 'Steam',
    2: 'Xbox Store',
    3: 'PlayStation Store',
    4: 'App Store',
    5: 'GOG',
    6: 'Nintendo Store',
    7: 'Xbox 360 Store',
    8: 'Google Play',
    9: 'itch.io',
    11: 'Epic Games',
};

const PLATFORMS = {
    pc: 4,
    playstation5: 187,
    playstation4: 18,
    'xbox-one': 1,
    'nintendo-switch': 7,
    ios: 3,
    android: 21,
};

const PLATFORM_TITLES = {
    pc: 'PC',
    playstation5: 'PlayStation 5',
    playstation4: 'PlayStation 4',
    'xbox-one': 'Xbox-One',
    'nintendo-switch': 'Nintendo Swtich',
    ios: 'iOS',
    android: 'Android',
};

gamesController.get('/', async (req, res) => {
    const search = req.query?.search?.trim();
    const page = req.query?.page || 1;

    try {
        const games = await getAllGames(search, page);

        let notFoundGames = false;

        if (games.count == 0) {
            notFoundGames = true;
        }

        let pages = Math.ceil(games.count / 15);
        let nextPage = Number(page) + 1 <= pages ? Number(page) + 1 : null;

        res.render('gamesSection', {
            title: `Games - Gamepedia`,
            games: games.results,
            notFoundGames,
            search: search || '',
            sectionHeading: 'Trending Games',
            page: page || 1,
            nextPage,
            prevPage: Number(page) - 1,
            pages,
        });
    } catch (error) {
        res.render('404', {
            title: `Page Not Found - Gamepedia`,
        });
    }
});

gamesController.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (!isNaN(id)) {
        try {
            const game = await gameById(id);
            const trailer = await gameTrailer(id);
            const stores = await gameStores(id);

            const availablePlatforms = [];
            const genres = [];

            stores.forEach((x) => (x.store_name = STORES[x.store_id]));

            game.platforms.forEach((x) => {
                availablePlatforms.push(x.platform.name);
            });

            game.genres.forEach((x) => {
                genres.push(x.name);
            });

            game.stores = stores;
            game.availablePlatforms = availablePlatforms.join(', ');
            game.genres = genres.join(', ');

            if (trailer.count != 0) {
                game.trailer = trailer.results[0].data.max;
            }

            res.render('oneGame', { title: `${game.name} - Gamepedia`, game });
        } catch (error) {
            res.render('404', {
                title: `Page Not Found - Gamepedia`,
            });
        }
    } else {
        const platformName = id;
        const platformId = PLATFORMS[platformName];

        const links = [];

        Object.keys(PLATFORMS).forEach((x) => {
            if (x == platformName) {
                links.push(true);
            } else {
                links.push(false);
            }
        });

        try {
            const search = req.query?.search?.trim();
            const page = req.query?.page || 1;

            const games = await gamesByPlatform(platformId, search, page);

            let notFoundGames = false;

            if (games.count == 0) {
                notFoundGames = true;
            }

            let pages = Math.ceil(games.count / 15);
            let nextPage = Number(page) + 1 <= pages ? Number(page) + 1 : null;

            res.render('gamesSection', {
                title: `${PLATFORM_TITLES[platformName]} Games - Gamepedia`,
                sectionHeading: `${PLATFORM_TITLES[platformName]} Games`,
                platformName,
                games: games.results,
                notFoundGames,
                search: search || '',
                page: page || 1,
                nextPage,
                prevPage: Number(page) - 1,
                pages,
                links,
            });
        } catch (error) {
            res.render('404', {
                title: `Page Not Found - Gamepedia`,
            });
        }
    }
});

export { gamesController };
