import express from 'express';

import { databaseConfig } from './config/database.js';
import { expressConfig } from './config/express.js';
import { routesConfig } from './config/routes.js';

const PORT = 3000;

const app = express();

await databaseConfig(app);
expressConfig(app);
routesConfig(app);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
