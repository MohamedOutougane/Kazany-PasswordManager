const crypto = require('crypto');   // import crypto module
const secret = process.env.SECRET_KEY;  // get the secret key from the .env file

const encrypt = (password) => {   
    // create a random 16 bytes buffer
    const iv = Buffer.from(crypto.randomBytes(16)); 

    // create a cipher with the secret key and the random buffer with the aes-256-cbc algorithm
    const cipher = crypto.createCipheriv(
        'aes-256-cbc', 
        Buffer.from(secret), 
        iv
    );

    // encrypt the password with the cipher by concatenating the updated password and the end of the cipher
    const encryptedPassword = Buffer.concat([
        cipher.update(password), 
        cipher.final()
    ]);

    // return the encrypted password and the random buffer
    return {
        iv: iv.toString("hex"),
        password: encryptedPassword.toString("hex")
    };
};

const decrypt = (encryption) => {
    // create a decipher with the secret key and the random buffer with the aes-256-cbc algorithm
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc', 
        Buffer.from(secret), 
        Buffer.from(encryption.iv, 'hex')
    );

    // decrypt the password with the decipher by concatenating the updated password and the end of the decipher
    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.password, 'hex')),
        decipher.final()
    ]);

    return decryptedPassword.toString();
};

module.exports = {
    encrypt,
    decrypt,
};