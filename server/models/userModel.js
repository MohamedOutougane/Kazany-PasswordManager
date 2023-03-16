const mongoose = require('mongoose');

const userSchema = mongoose.Scheme(
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
        salt: {
            type: String,
            required: true
        },
    }, 
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);