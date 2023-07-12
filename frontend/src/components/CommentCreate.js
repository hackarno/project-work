import { useState } from "react";
import { useConversationContext } from "../hooks/useConversationContext"
import { useAuthContext } from "../hooks/useAuthContext";

const CommentCreate = (conversation) => {
    const {dispatch} = useConversationContext()
    const { user } = useAuthContext()

    const [comment, setComment] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Returning if user is not logged in, also setting an error
        if (!user) {
            setError("Please log in to comment")
            return
        }

        const commentWhole = {"comment": comment, "time": new Date().toISOString()
        , "user": user.email}

        let comments = conversation.conversation.comments
        comments.push(commentWhole)
        const patchBody = {"comments": comments}

        const patchUrl = "http://localhost:4000/api/conversations/" + conversation.conversation._id

        //Sending PATCH request to make an comment. Comment is attached to conversation data in the backend.

        const response = await fetch(patchUrl, {
            method: "PATCH",
            body: JSON.stringify(patchBody),
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            //If POST was succesful, form and error-variable are cleared
            setComment("")
            setError(null)
            setEmptyFields([])
            dispatch({type: "SET_CONVERSATION", payload: json})
        }
    }

    //This component provides form to submit a new comment as a return

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Comment on this post</h3>
            <label>Your comment: </label>
            <textarea 
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                //className={emptyFields.includes("code") ? "error" : ""}
            /> <br></br>   
            <button>Submit comment</button>
            {error && <div className="error">{error}</div>}  
        </form>
    )
}

export default CommentCreate