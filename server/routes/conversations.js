const express = require("express");
const router = express.Router();

const {
    getConversation,
    getConversations,
    createConversation,
    deleteConversation,
    updateConversation
} = require("../controllers/conversationController")


//requireAuth is called always as a middleware before advancing to any of the routes
//This is to check authorization to access routes
const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)

// No longer needed? const Conversation = require("../models/conversationModel")

//Following routes are needed to conversations: get all conversations, post new conversation, edit conversation, delete conversation


//Get all conversations
router.get("/", getConversations)

//Get single conversation
router.get("/:id", getConversation)

//Post a new conversation starter
router.post("/", createConversation)

//Delete a conversation
router.delete("/:id", deleteConversation)

//Update a conversation
router.patch("/:id", updateConversation)

module.exports = router;