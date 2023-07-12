//This .js is order to keep local state in sync with database when adding or deleting conversations.
//Site can be updated without reloading.

import { createContext, useReducer } from "react";

export const ConversationContext = createContext();

export const conversationsReducer = (state, action) => {
    switch (action.type) {
        case "SET_CONVERSATION":
            return{
                //Initial database enquiry to get opened conversation to state
                conversation: action.payload
            }
        case "SET_CONVERSATIONS":
            return{
                //Initial database enquiry
                conversations: action.payload
            }
        case "CREATE_CONVERSATION":
            return {
                //New conversation is added in front of spread out state to form new conversations
                conversations: [action.payload, ...state.conversations]
            }
        case "DELETE_CONVERSATION":
            return {
                //If id does not match to id of conversation being deleted, it stays in the state
                conversations: state.conversations.filter((c) => c._id !== action.payload._id)
            }    
        default:
            return state
    }
}

//Wrapping the main app (children) to provide all components access to ConversationContext (spreadout (...) state and value available)

export const ConversationsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(conversationsReducer, {
        conversations: null
    })

    return (
        <ConversationContext.Provider value={{...state, dispatch}}>
            { children }
        </ConversationContext.Provider>
    )

}

