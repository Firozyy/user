import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from 'jsonwebtoken'
import validator from 'validator'
const userShema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter your name']
    },
    password: {
        type: String,
        require: [true, 'Please enter your password'],
        minLength: [4, 'Atleast 4 charector'],
        select: false,

    }
    , email: {
        require: [true, 'Please enter your email'],
        unique: true,
        type: String,
        validate: [validator.isEmail, "Enter a valid email"],


    }
});
// password hasing
userShema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();
});

userShema.methods.getJWTtoken = function () {
    return Jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY
    });
};

//password check decrypting
userShema.methods.comaparePassword = async function (password) {

    return await bcrypt.compare(password, this.password);

};
export const USER = mongoose.model("user", userShema);