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

app.get('/api/records', (req, res) => {
    res.status(200).json({                                  // the .status is optional, it is a good practice to send it
        message: "Page des enregistrements !"
    });                                                     // check if we get the json object when we go to localhost:3001/api/records
});     

