const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    user_salt:{
        type:String,
        required:true
    },
    user_hash:{
        type:String,
        required:true
    }
})



// userSchema method for setting password
userSchema.methods.setPassword = function (password) {
    // creating a unique salt for a particular user
    this.user_salt = crypto.randomBytes(16).toString("hex");

    // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest

    this.user_hash = crypto
        .pbkdf2Sync(password, this.user_salt, 1000, 64, `sha512`)
        .toString(`hex`);
};

// userSchema method for validating password
userSchema.methods.validPassword = function (password) {
    let hash = crypto
        .pbkdf2Sync(password, this.user_salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return this.user_hash === hash;
};

const User = mongoose.model("User", userSchema);

module.exports = User