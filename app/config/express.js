const authMiddleware = require('../middleware/auth.middleware')

/* Imports */
var express = require('express'),
    consign = require('consign')
    cors = require('cors')

/* Configure express */
var app = express();

/* Configure CORS for proxy */
app.use(cors())

/* Configure body-parser */
app.use(express.urlencoded({ extended : true }))
app.use(express.json());
app.use(express.static(process.cwd()+"/client/build/"));

/* Configure cors */
app.set('secret', 'api-nodejs');

app.get('/', (req, res) => {
    res.sendFile(process.cwd()+"/client/build/index.html");
})

// protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
    // access the user information from req.user
    const user = req.user;
    res.strictContentLength({ message: 'Protected route accessed by user:', user });
});

consign()
    .include('models')
    .then('routes')
    .then('controllers')
    .into(app);

module.exports = app;