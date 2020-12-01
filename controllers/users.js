const User = require('../models/user');


module.exports.renderRegister = (req, res) => {
    res.render('users/register')
};


module.exports.createUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const newUser = await User.register(user, password);
        console.log(newUser);
        req.login(newUser, err => {
            if (err) return next(err);
        });
        req.flash('success', `Hi ${username}, welcome to Yelp Camp!`);
        res.redirect('/campgrounds')
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register')
    }
};


module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};


module.exports.login = (req, res) => {
    const { username } = req.body;
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    req.flash('success', `Hello ${username}, welcome back!`);
    res.redirect(redirectUrl);
};


module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'See you next time.')
    res.redirect('/campgrounds');
};