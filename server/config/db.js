const mongoose = require('mongoose');


const connectDB = async () => {
    try {                                                           // try to connect to the database
        const conn = await mongoose.connect(process.env.MONGO_URI); // connect to the database

        console.log(`MongoDB Connected: ${conn.connection.host}`);  // log the connection
    } catch (err) {                                                 // if there is an error, log it and exit the process
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;