require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const conversationRoutes = require("./routes/conversations");
const userRoutes = require("./routes/user");


//Establishing Express app
const app = express();

//Global middleware for every request coming in

app.use(express.json());
app.use(cors()) //This is for localhost testing purposes

app.use((req, res, next) => {
    console.log("New request to path: " + req.path + " with method: " + req.method)
    next();
})

//Routes

app.use("/api/conversations", conversationRoutes);
app.use("/api/user", userRoutes);

//Connect to db (Mongo Atlass)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        //Start listening on requests once database connection is up and running
        app.listen(process.env.PORT, () => {
            console.log("Connected to Mongo Atlas database and server.js listening on port: 4000");
        });

    })
    .catch((error) => {
        console.log("Following error occurred while connecting to Mongodb: " + error)
    })



