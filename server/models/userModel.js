const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//Static method for registering users
userSchema.statics.register = async function(email, password) {

    //Validation

    if(!email || !password) {
        throw Error("Please fill all the fields")
    }
    if(!validator.isEmail(email)) {
        throw Error("Email submitted is not a valid email address")
    }
    //validators normal isStrongPassword function is used for password validation
    if(!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough")
    }

    const exists = await this.findOne({email})

    if(exists) {
        throw Error("Email already in use")
    }

    //Create salt and hash the password+salt combined
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //Create new user to db with email and hashed password
    const user = await this.create({email, password: hash})

    return user
}

//Static login method
userSchema.statics.login = async function(email, password) {

    //Validation
    if(!email || !password) {
        throw Error("Please fill all the fields")
    }
    //Finding user from db and putting it into variable "user"
    const user = await this.findOne({email})
    //If user is not found from database by email, throw error
    if(!user) {
        throw Error("Invalid email or password")
    }
    //If user is found, check if password is correct using bcrypt function .compare()
    const match = await bcrypt.compare(password, user.password)
    //If password does not match the one in database, throw error
    if(!match) {
        throw Error("Invalid email or password")
    }
    
    return user

}


//Exports

module.exports = mongoose.model("User", userSchema)