//In this controller-file all the different functions for conversations route are established. 
//Controller file is created in order to keep the conversation-route-file less bloated.

const Conversation = require("../models/conversationModel");
const mongoose = require("mongoose");

//Get all conversations
const getConversations = async (req, res) => {

    //Limiting conversations by creator !!! Not final functionality, note passed user_id in .find function below
    //const user_id = req.user._id

    //Finding and fetching all conversation documents from database. Object is left empty in the find function because there are no searchwords
    //Sorting the results by creating date with newest one on top
    const conversations = await Conversation.find({}).sort({createdAt: -1});
    res.status(200).json(conversations);
}

//Get a single conversation

const getConversation = async (req, res) => {
    //Grabbing id property from request
    const { id } = req.params;

    //If id is not valid format, error is returned to client
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Conversation does not exist"})
    }

    const conversation = await Conversation.findById(id)

    if (!conversation) {
        return res.status(404).json({error: "Conversation does not exist"})
    }

    res.status(200).json(conversation);

}

//Create a new conversation
const createConversation = async (req, res) => {
    //Extracting the relevant data for Schema from request posted
    const {title, text, code, userName} = req.body 

    //Checking if all the form fields include something. If not, error is handled before trying db submit

    let emptyFields = []

    if(!title) {
        emptyFields.push("title")
    }
    if(!text) {
        emptyFields.push("text")
    }
    if(!code) {
        emptyFields.push("code")
    }
    if(emptyFields.length > 0) {
        //If not all fields are submitted, error-message and array containing blank fields is sent back
        //Array sent makes conditional styling possible in frontend 
        return res.status(400).json({ error: "Please fill in all the fields.", emptyFields})
    }

    try {
        //Grabbing user id to store it to conversation document
        const user_id = req.user.id
        
        //Creating empty comment array
        const comments = [];
        //First try to create new document to the database with data extracted from the request
        const conversation = await Conversation.create({title, text, code, userName, user_id, comments}); 
        res.status(200).json(conversation)

    } catch (error) {
        //In case of error in saving to db, error status and message is sent pack to client
        res.status(400).json({error: error.message})
    }
}

//Delete a conversation

//Please note, that this functionality is currently not linked to any API route.
//Routing can be enabled from routes/conversations.js, but as it stands, any user can make delete request
//Proper authentication functionality is lacking

const deleteConversation = async (req, res) => {
    //Grabbing id property from request
    const { id } = req.params;

    //If id is not valid format, error is returned to client
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Conversation does not exist"})
    }

    const conversation = await Conversation.findOneAndDelete({_id: id})

    if (!conversation) {
        return res.status(400).json({error: "Conversation does not exist"})
    }

    res.status(200).json(conversation);

}

//Update a conversation

const updateConversation = async (req, res) => {
    //Grabbing id property from request
    const { id } = req.params;

    //If id is not valid format, error is returned to client
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Conversation does not exist"})
    }

    //Only updates to comments are passed through. No other updates are to be made through this API

    const update = {"comments": req.body.comments}
    console.log(update)

    //Updating only document parameters that were received in the request body
    const conversation = await Conversation.findOneAndUpdate({_id: id}, {
        ...update
    }, {new:true});

    if (!conversation) {
        return res.status(400).json({error: "Conversation does not exist"})
    }
    //This returns the updated conversation now! {new:true} option to be removed from findOneAndUpdate-function if wanted otherwise
    res.status(200).json(conversation)
}


//Functions are exported
module.exports= {
    getConversation,
    getConversations,
    createConversation,
    deleteConversation,
    updateConversation
}