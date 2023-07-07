const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

//Function for token creation. Can be used both when loggin in and registering new user (user gets logged in when registering)

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: "1d"} )
}

//Login user

const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        //Log in user by calling function from userModel.js -model
        const user = await User.login(email, password)
        //Create jwt for logged in user
        const token = createToken(user._id)
        //response status, email and token
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }    
}

//Register user

const registerUser = async (req, res) => {
    const {email, password} = req.body

    try {
        //Create user to db by calling function from userModel.js -model
        const user = await User.register(email, password)
        //Create jwt for new user
        const token = createToken(user._id)
        //response status, email and token
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }    
}

module.exports = {loginUser, registerUser}