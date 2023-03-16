const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 3001;                      // set port to the environment variable PORT or 3001

connectDB();                                                // connect to the database

const app = express();

app.use(express.json());                                    // use express.json() to parse JSON bodies
app.use(express.urlencoded({ extended: false }));           // use express.urlencoded() to parse URL-encoded bodies, when extended is true it can parse nested objects

app.listen(port, () => {                                    // check if server is running
    console.log(`Server is running on port ${port}.`);      // if so, log it
    console.log(`The .env PORT is ${process.env.PORT}`);    // log the environment variable PORT from .env file
});

app.get('/', (req, res) => {                                //check if server is running when we go to localhost:3001
    res.send("Hello World!");                               // if so, send "Hello World!"
});

app.use('/api/records', require('./routes/recordRoutes'));  // use the recordRoutes.js file for the /api/records routes
app.use('/api/users', require('./routes/userRoutes'));      // use the userRoutes.js file for the /api/users routes