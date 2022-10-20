import { Router } from 'express';
import { platformNews } from '../services/newsService.js';
import { getPlatforms, platformById, topRatedGamesByPlatform } from '../services/platformService.js';

const platformController = Router();

platformController.get('/', async (req, res) => {
    try {
        const platforms = await getPlatforms();
        let platform_news = await platformNews();
        platforms.forEach((x, i) => (x.image_background = `/static/assets/platforms/${i}.jpg`));

        platform_news = platform_news.slice(0, 10).filter((x) => x.title.length <= 500);

        res.render('platforms', { title: 'Platforms - Gamepedia', platforms, platform_news });
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
