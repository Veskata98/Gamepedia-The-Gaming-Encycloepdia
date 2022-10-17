import { Router } from 'express';
import { getNews } from '../services/newsService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    try {
        const gamingNews = await getNews();
        // const gamingNews = new Promise();

        gamingNews.forEach((x) => {
            x.date = x.date.toLocaleString();
        });

        res.render('home', { title: 'Gamepedia', news: gamingNews });
    } catch (error) {
        res.render('home', { title: 'Gamepedia' });
    }
});

export { homeController };
