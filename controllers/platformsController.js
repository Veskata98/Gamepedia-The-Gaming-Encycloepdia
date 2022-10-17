import { Router } from 'express';
import { getPlatforms, platformById, topRatedGamesByPlatform } from '../services/platforms.js';

const platformController = Router();

platformController.get('/', async (req, res) => {
    try {
        const platforms = await getPlatforms();
        res.render('platforms', { title: 'Platforms - Gamepedia', platforms });
    } catch (error) {
        res.render('404', {
            title: `Page Not Found - Gamepedia`,
        });
    }
});

platformController.get('/:platform_id', async (req, res) => {
    const platform_id = req.params.platform_id;

    try {
        const platform = await platformById(platform_id);
        const topGames = await topRatedGamesByPlatform(platform_id);

        res.render('platforms-details', {
            title: `${platform.name} - Gamepedia`,
            platform,
            topGames,
        });
    } catch (error) {
        res.render('404', {
            title: `Page Not Found - Gamepedia`,
        });
    }
});

export { platformController };
