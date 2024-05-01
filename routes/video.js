const express = require('express');
const router = express.Router();
const path = require('path');
const dbConnectionPath = path.join(__dirname, '..', 'data', 'database.json');
const db = require('../db.js')(dbConnectionPath);
const videoController = require('../controllers/videoController');

function ensureLoggedIn(req, res, next) {
    if (!req.session.user) {
        res.redirect('/auth/login?message=You must login to access this content');
    } else {
        next();
    }
}

router.get('/dashboard', ensureLoggedIn, (req, res) => {
    res.redirect('/video/dashboard/all');  
});

router.get('/dashboard/:videofilter', ensureLoggedIn, videoController.displayDashboard);
router.get('/new_video', ensureLoggedIn, (req, res) => {
    res.render('newVideo', { message: req.query.message, error: req.query.error });
});
router.post('/new', ensureLoggedIn, videoController.addNewVideo);

module.exports = router;