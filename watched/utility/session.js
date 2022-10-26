module.exports = {
    redirectLogin: (req, res, next) => {
        if (!req.session.userID)
            res.redirect('/login');
        else
            next();
    },

    redirectHome: (req, res, next) => {
        if (req.session.userID)
            res.redirect('/user');
        else
            next();
    }
}