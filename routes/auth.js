const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Note: Make sure it's authController if you are using it for both registration and login


router.get('/register', (req, res) => {
    res.render('register', { error: req.query.error });
});


router.post('/register', authController.register);


router.get('/login', (req, res) => {
    
    res.render('login', { message: req.query.message });
});


router.post('/login', authController.login);

module.exports = router;