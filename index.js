import express from 'express';
import ExpressHandlebars from 'express-handlebars';
import { authController } from './controllers/authController.js';
import { gamesController } from './controllers/games.js';
import { homeController } from './controllers/homeController.js';
import { platformController } from './controllers/platforms.js';

const PORT = 3000;

const app = express();

const exphbs = ExpressHandlebars.create({ extname: '.hbs' });

app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('static'));
app.use('/favicon.ico', express.static('./favicon.ico'));

app.use(homeController);
app.use('/platforms', platformController);
app.use('/games', gamesController);
app.use('/auth', authController);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
