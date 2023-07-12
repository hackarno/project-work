import { ConversationContext } from "../context/ConversationContext";
import { useContext } from "react";

export const useConversationContext = () => {
    const context = useContext(ConversationContext)

    if (!context) {
        throw Error ("useConversationContext must be used inside an ConversationContextProvider")
    }
    
    return context
}
