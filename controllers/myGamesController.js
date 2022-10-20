import { Router } from 'express';

const myGamesController = Router();

myGamesController.get('/', async (req, res) => {
    try {
        res.render('myGames', { title: 'My Games - Gamepedia' });
    } catch (error) {
        res.render('myGames', { title: 'My Games - Gamepedia' });
    }
});

export { myGamesController };
