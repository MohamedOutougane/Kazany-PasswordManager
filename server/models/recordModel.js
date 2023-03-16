const mongoose = require('mongoose');

const recordSchema = mongoose.Schema(
    {
        name : {                                    // name of the record
            type: String,
            required: true
        },
        url : {                                     // url of the app/website
            type: String,
            required: false
        },
        password : {                                // password of the app/website  
            type: String,
            required: true
        },
        salt : {                                    // salt of the password
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true                            // add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Record', recordSchema);