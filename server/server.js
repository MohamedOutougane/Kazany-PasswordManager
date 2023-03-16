const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3001;                      // set port to the environment variable PORT or 3001

const app = express();

app.listen(port, () => {                                    // check if server is running
    console.log(`Server is running on port ${port}.`);      // if so, log it
    console.log(`The .env PORT is ${process.env.PORT}`);    // log the environment variable PORT from .env file
});

app.get('/', (req, res) => {                                //check if server is running when we go to localhost:3001
    res.send("Hello World!");                               // if so, send "Hello World!"
});

app.use('/api/records', require('./routes/recordRoutes'));  // use the recordRoutes.js file for the /api/records routes
