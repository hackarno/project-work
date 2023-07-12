import { useConversationContext } from "../hooks/useConversationContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom"

//Date fns for formatting dates in more readable format
import formatDistanceToNow from "date-fns/formatDistanceToNow"


const ConversationPreview = ({conversation}) => {
    
    const {dispatch} = useConversationContext();
    const {user} = useAuthContext();
    
    //handleClick function here

    return (
        <div className="conversation-preview">
            <h4>{conversation.title}</h4>
            <pre><code>{conversation.code}</code></pre>
            <p>{conversation.text}</p>
            <p className="postDate">First posted {formatDistanceToNow(new Date(conversation.createdAt), {addSuffix: true})}</p>
            <p className="editDate">Edited {formatDistanceToNow(new Date(conversation.updatedAt), {addSuffix: true})}</p>
            <h6>{conversation.comments.length} comment(s)</h6>
            <Link to={"/conversation/" + conversation._id} >Show conversation</Link>
        </div>
    )

}

export default ConversationPreview;

// <button onClick={handleClick}>delete</button> This is to be placed inside conversation-preview div if delete functionality is needed

//handleClick function to be placed inside conversation preview if deletefunction is needed

/* const handleClick = async () => {
    //If user is not logged in, returning
    if(!user) {
        return
    }
    
    const response = await fetch ("http://localhost:4000/api/conversations/" + conversation._id, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    })
    const json = await response.json();

    if (response.ok) {
        dispatch({type: "DELETE_CONVERSATION", payload: json})
    }
} */
