const db = require('../db'); 

exports.addNewVideo = (req, res) => {
    const { title, url } = req.body;
    if (title && url) {
        if (db.addVideo({ title, url, username: req.session.user.username })) {
            res.redirect('/video/new_video?message=Video added successfully');
        } else {
            res.redirect('/video/new_video?error=Could not add video');
        }
    } else {
        res.redirect('/video/new_video?error=Please provide both title and URL');
    }
};

exports.displayDashboard = (req, res) => {
    const videofilter = req.params.videofilter;
    const username = req.session.user.username;

    let videos;
    if (videofilter === "all") {
        videos = db.getAllVideos();
    } else if (videofilter === "mine") {
        videos = db.getVideosByUsername(username);
    }

    res.render('dashboard', { videos: videos, user: req.session.user });
};