const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tapez votre nom']
        },
        email: {
            type: String,
            required: [true, 'Tapez votre email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Tapez votre mot de passe'],
        },
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);