const hasUser = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

const isGuest = (req, res, next) => {
    if (!req.user) {
        next();
    } else {
        res.redirect('/');
    }
};

export { hasUser, isGuest };
