const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

function ensureLoggedIn(req, res, next) {
    if (!req.session.user) {
        res.redirect('/auth/login?message=You must login to access this content');
    } else {
        next();
    }
}

// Route for the general dashboard, accessible only to logged-in users
router.get('/dashboard', ensureLoggedIn, (req, res) => {
    res.redirect('/video/dashboard/all');  
});

// Route for the dashboard with video filter (all or mine)
router.get('/dashboard/:videofilter', ensureLoggedIn, videoController.displayDashboard);

// Route to display the form for adding a new video
router.get('/new_video', ensureLoggedIn, (req, res) => {
    res.render('newVideo', { message: req.query.message, error: req.query.error });
});

// Route to handle the submission of the form for new videos
router.post('/new', ensureLoggedIn, videoController.addNewVideo);

module.exports = router;
