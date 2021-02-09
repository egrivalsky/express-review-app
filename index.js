// 1 - Environment
require('dotenv').config();
// 2 - Imports
const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

// 3 - App Set up
const app = express();
app.set('view engine', 'ejs');

// 4 - App Middleware
app.use(express.urlencoded({ extended: false })); // req.body, req.params, req.query
app.use(methodOverride('_method'));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

// 5 - Route (controllers)
app.get('/', (req, res) => {
    res.send('Welcome to the backend');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/form1', (req, res) => {
    res.render('form1');
});

app.get('/form2', (req, res) => {
    res.render('form2');
});

app.get('/rome', (req, res) => {
    axios.get('https://api.github.com/users/romebell')
    .then(response => {
        console.log(response.data); // What datatype is this? (object)
        res.render('github', { data: response.data });
    });
});

app.get('/example1/:id', (req, res) => {
    // print req.parmams in the terminal
    console.log(req.params);
    // print the id
    console.log(req.params.id);
    res.render('example1', { paramsObject: req.params });
});

app.get('/players', (req, res) => {
    // go to database and get all players from the players table in the ga_league database
    db.player.findAll()
    .then(allPlayers => {
        // print allPlayer in the terminal
        console.log(allPlayers); // what datatype is this? (array)
        res.render('players', { players: allPlayers });
    });
});

app.get('result1', (req, res) => {
    res.render('result1');
});

app.get('result2', (req, res) => {
    res.render('result2');
});

// POST ROUTES
app.post('/result1', (req, res) => {
    const incomingData = req.body; // what datatype is this? (object)
    console.log(incomingData); // print incomingData
    res.render('result1', { data: incomingData }); // send data to view
});

app.post('/result2', (req, res) => {
    const incomingData = req.body; // what datatype is this? (object)
    console.log(incomingData); // print incomingData
    let username = req.body.github;
    axios.get(`https://api.github.com/users/${username}`)
    .then(response => {
        console.log(response.data); // print the data that comes back
        const githubData = response.data;
        res.render('result2', { githubData }); // send data to view
    });
    // res.render('result2', { githubData }); 
});


// Set up PORT and listen on PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});