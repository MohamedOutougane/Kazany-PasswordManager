const mongoose = require('mongoose');

const recordSchema = mongoose.Schema(
    {
        name : {                                    // name of the record
            type: String,
            required: true
        },
        pseudo : {                                  // pseudo of the app/website
            type: String,
            required: false
        },
        email : {                                   // email of the app/website
            type: String,
            required: false
        },
        url : {                                     // url of the app/website
            type: String,
            required: false
        },
        password : {                                // password of the app/website  
            type: String,
            required: true
        },
        iv : {                                    // iv of the password
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true                            // add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Record', recordSchema);