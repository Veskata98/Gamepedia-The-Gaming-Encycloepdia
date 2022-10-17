import express from 'express';
import ExpressHandlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import auth from '../middlewares/auth.js';
import userNav from '../middlewares/userNav.js';

const jwtSecret = '823u8F$943ru4398U$yr734g9fewasmcxznvbk';

const expressConfig = (app) => {
    const exphbs = ExpressHandlebars.create({ extname: '.hbs' });

    app.engine('hbs', exphbs.engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());
    app.use(auth(jwtSecret));
    app.use(userNav());

    app.use('/static', express.static('static'));
    app.use('/favicon.ico', express.static('./favicon.ico'));
};

export { expressConfig };
