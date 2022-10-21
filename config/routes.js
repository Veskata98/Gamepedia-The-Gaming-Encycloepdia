import { homeController } from '../controllers/homeController.js';

import { platformController } from '../controllers/platformsController.js';
import { gamesController } from '../controllers/gamesController.js';

import { myGamesController } from '../controllers/myGamesController.js';
import { forumController } from '../controllers/forumController.js';
import { discussionsController } from '../controllers/discussionsController.js';

import { authController } from '../controllers/authController.js';

const routesConfig = (app) => {
    app.use(homeController);

    app.use('/platforms', platformController);
    app.use('/games', gamesController);

    app.use('/myGames', myGamesController);
    app.use('/forum', forumController);
    app.use('/forum/discussions', discussionsController);

    app.use('/auth', authController);
};

export { routesConfig };
