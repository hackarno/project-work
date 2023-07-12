import { useConversationContext } from "../hooks/useConversationContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useId } from "react"

//Date fns for formatting dates in more readable format
import formatDistanceToNow from "date-fns/formatDistanceToNow"


const ConversationFocus = ({conversation}) => {
    
    const {dispatch} = useConversationContext();
    const {user} = useAuthContext();
    
    //handleClick function here

    let anyComments = false;
    if (conversation.comments.length > 0) {
        anyComments = true;
    }

    const id = useId()

    return (
        <>
            <div className="conversation-preview">
                <h4>{conversation.title}</h4>
                <h5>posted by user {conversation.userName}</h5>
                <h6>@ {conversation.createdAt} UTC time ({formatDistanceToNow(new Date(conversation.createdAt), {addSuffix: true})})</h6>
                <pre><code>{conversation.code}</code></pre>
                <p>{conversation.text}</p>    
                <h6>{conversation.comments.length} comment(s)</h6>
            </div>
            <div>
                <h4>Comment(s):</h4>
                {!anyComments ? <p>Be first one to comment!</p> 
                : 
                <div>
                    {conversation.comments.map((comment) => (
                    <div className="comment-box" key={id + Math.random()} >
                        <h5>Comment by {comment.user}</h5> 
                        <h6>@ {comment.time} UTC time ({formatDistanceToNow(new Date(comment.time), {addSuffix: true})})</h6>
                        <p>{comment.comment}</p>
                    </div>))}
                </div>
                }
            </div>
            
        </>    
       
    )

}

export default ConversationFocus;

// <button onClick={handleClick}>delete</button> This is delete button for conversation-preview div

//This is handleClick function to be placed inside ConversationFocus function
/*     const handleClick = async () => {
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

