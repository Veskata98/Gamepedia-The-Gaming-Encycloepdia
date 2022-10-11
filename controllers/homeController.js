import { Router } from 'express';
import { getNews } from '../services/news.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const gamingNews = await getNews();

        gamingNews.forEach((x) => {
            x.date = x.date.toLocaleString();
        });

        res.render('home', { title: 'Gamepedia', news: gamingNews });
    } catch (error) {
        res.render('home', { title: 'Gamepedia' });
    }
});

export { router as homeController };
