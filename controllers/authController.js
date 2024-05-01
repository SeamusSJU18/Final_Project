const db = require('../db'); 

exports.register = (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        if (db.addUser({ username, password })) {
            res.render('accountCreated', { username: username });
        } else {
            res.redirect('/auth/register?error=User already exists');
        }
    } else {
        res.redirect('/auth/register?error=Please fill all fields');
    }
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    let user = db.getUserByUsername(username);
    if (user && user.password === password) {
        req.session.user = { username: username };
        res.redirect('/video/dashboard');
    } else {
        res.redirect('/auth/login?error=Invalid credentials');
    }
};