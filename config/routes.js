import { authController } from '../controllers/authController.js';
import { gamesController } from '../controllers/gamesController.js';
import { homeController } from '../controllers/homeController.js';
import { platformController } from '../controllers/platformsController.js';

const routesConfig = (app) => {
    app.use(homeController);
    app.use('/platforms', platformController);
    app.use('/games', gamesController);
    app.use('/auth', authController);
};

export { routesConfig };
