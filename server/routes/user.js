const express = require("express")

//Controllers
const {loginUser, registerUser} = require("../controllers/userController")

const router = express.Router()

//Login route
router.post("/login", loginUser)

//Register route
router.post("/register", registerUser)

module.exports = router