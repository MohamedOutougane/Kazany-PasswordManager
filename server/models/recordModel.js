const mongoose = require('mongoose');

const recordSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,   // the type of the field is an ObjectId
            required: true,                         
            ref: 'User'                             // the field is a reference to the User model
        },
        name : {                                    // name of the record
            type: String,
            required: [true, 'Tapez le nom de l\'enregistrement']
        },
        pseudo : {                                  // pseudo of the app/website
            type: String,
            required: [false, 'Tapez le pseudo']
        },
        email : {                                   // email of the app/website
            type: String,
            required: [false, 'Tapez l\'email']
        },
        url : {                                     // url of the app/website
            type: String,
            required: [false, 'Tapez l\'url']
        },
        password : {                                // password of the app/website  
            type: String,
            required: [true, 'Tapez le mot de passe']
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