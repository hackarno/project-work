//Require mongoose to be able to make Schemas (mongoose function)

const mongoose = require("mongoose");

//Function to make new Schema

const Schema = mongoose.Schema

const conversationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    comments: {
        type: Array
    }
}, {timestamps: true});

//Making model based on the Schema

module.exports = mongoose.model("Conversation", conversationSchema);