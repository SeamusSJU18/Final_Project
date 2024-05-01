const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Configure session management
app.use(session({
    secret: 'your_secret_key', // Replace 'your_secret_key' with a real secret in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 } // Set cookie.secure to true if using HTTPS
}));

// Handle form submissions and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'resources')));

// Database setup
const dbConnectionPath = path.join(__dirname, 'data/database.json'); // Ensure this path is correct
const db = require('./db')(dbConnectionPath); // Adjust the require path as needed

// Import and use router modules
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');

// Provide db instance through middleware to make it accessible in the route handlers
app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/auth', authRoutes);
app.use('/video', videoRoutes);

// Redirect root URL to the login page
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));