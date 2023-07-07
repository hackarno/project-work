//In this controller-file all the different functions for conversations route are established. 
//Controller file is created in order to keep the conversation-route-file less bloated.

const Conversation = require("../models/conversationModel");
const mongoose = require("mongoose");

//Get all conversations
const getConversations = async (req, res) => {

    //Limiting conversations by creator !!! Not final functionality, note passed user_id in .find function below
    const user_id = req.user._id

    //Finding and fetching all conversation documents from database. Object is left empty in the find function because there are no searchwords
    //Sorting the results by creating date with newest one on top
    const conversations = await Conversation.find({ user_id }).sort({createdAt: -1});
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
    const {title, text} = req.body 

    //Checking if all the form fields include something. If not, error is handled before trying db submit

    let emptyFields = []

    if(!title) {
        emptyFields.push("title")
    }
    if(!text) {
        emptyFields.push("text")
    }
    if(emptyFields.length > 0) {
        //If not all fields are submitted, error-message and array containing blank fields is sent back
        //Array sent makes conditional styling possible in frontend 
        return res.status(400).json({ error: "Please fill in all the fields.", emptyFields})
    }

    try {
        //Grabbing user id to store it to conversation document
        const user_id = req.user.id
        //First try to create new document to the database with data extracted from the request
        const conversation = await Conversation.create({title, text, user_id}); 
        res.status(200).json(conversation)

    } catch (error) {
        //In case of error in saving to db, error status and message is sent pack to client
        res.status(400).json({error: error.message})
    }
}

//Delete a conversation
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

    //Updating only document parameters that were received in the request body
    const conversation = await Conversation.findOneAndUpdate({_id: id}, {
        ...req.body
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