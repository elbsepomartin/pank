const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import routes
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');

app.use('/users', usersRoute); //Removes the usage of /users in users.js
app.use('/login', loginRoute); //Removes the usage of /login in login.js

//Database connection
mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected to DB!')
);

//Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

//Port listen
app.listen(3000);