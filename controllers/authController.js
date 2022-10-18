import { Router } from 'express';

import { login, register } from '../services/authService.js';
import { hasUser, isGuest } from '../middlewares/guards.js';
import { body, validationResult } from 'express-validator';
import { errorParser } from '../utils/errorParser.js';

const authController = Router();

//LOGIN
/////////////////////////////

authController.get('/login', isGuest, (req, res) => {
    res.render('login', { title: 'Sing In - Gamepedia' });
});

authController.post('/login', isGuest, async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    try {
        if (username == '' || password == '') {
            throw new Error('All fields are required');
        }

        const userData = await login(username, password);
        attachToken(req, res, userData);

        res.redirect('/');
    } catch (error) {
        const errorMessages = errorParser(error);
        res.render('login', { title: 'Sing In - Gamepedia', errorMessages, username });
    }
});

//REGISTER
/////////////////////////////

authController.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Sign Up - Gamepedia' });
});

authController.post(
    '/register',
    isGuest,
    body('username').trim().isAlphanumeric('en-US').withMessage('Username must contain only latin letters and digits'),
    body('password').trim().isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long'),
    async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const repass = req.body.repass;

        try {
            if (username == '' || password == '') {
                throw new Error('All fields are required');
            }

            if (password !== repass) {
                throw new Error('Password do not match');
            }

            const errors = validationResult(req)
                .array()
                .map((x) => x.msg)
                .join('\n');

            if (errors) {
                throw new Error(errors);
            }

            const userData = await register(username, password);
            attachToken(req, res, userData);

            res.redirect('/auth/register');
        } catch (error) {
            const errorMessages = errorParser(error);
            res.render('register', { title: 'Sign Up - Gamepedia', errorMessages, username });
        }
    },
);

//LOGOUT
/////////////////////////////

authController.post('/logout', hasUser, (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

//TOKEN ATTACHMENT
/////////////////////////////

const attachToken = (req, res, data) => {
    const token = req.signJwt(data);
    res.cookie('token', token, { maxAge: 14400000 });
};

export { authController };
