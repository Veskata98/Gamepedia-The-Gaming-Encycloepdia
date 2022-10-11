import { Router } from 'express';

const authController = Router();

authController.get('/login', (req, res) => {
    res.render('login', { title: 'Sign In - Gamepedia' });
});

authController.get('/register', (req, res) => {
    res.render('register', { title: 'Sign Up - Gamepedia' });
});

export { authController };
