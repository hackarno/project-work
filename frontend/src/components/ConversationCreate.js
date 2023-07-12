import { useState } from "react";
import { useConversationContext } from "../hooks/useConversationContext"
import { useAuthContext } from "../hooks/useAuthContext";

const ConversationCreate = () => {
    const {dispatch} = useConversationContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [error, setError] = useState(null)
    const [code, setCode] = useState("")
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Returning if user is not logged in, also setting an error
        if (!user) {
            setError("Please log in to make a post")
            return
        }

        //Setting up data to store

        const userName = user.email

        const conversation = {title, text, code, userName}

        //Sending POST request to API to store new conversation

        const response = await fetch("http://localhost:4000/api/conversations", {
            method: "POST",
            body: JSON.stringify(conversation),
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
            setTitle("")
            setText("")
            setCode("")
            setError(null)
            setEmptyFields([])
            dispatch({type: "CREATE_CONVERSATION", payload: json})
        }
    }

    //This component provides the form to submit new conversation as a return

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create new post</h3>

            <label>Title: </label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                //className={emptyFields.includes("title") ? "error" : ""}
            />
            <label>Code: </label>
            <textarea 
                onChange={(e) => setCode(e.target.value)}
                value={code}
                //className={emptyFields.includes("code") ? "error" : ""}
            /> <br></br>   
            <label>Text: </label>
            <textarea 
                onChange={(e) => setText(e.target.value)}
                value={text}
                //className={emptyFields.includes("text") ? "error" : ""}
            /> <br></br>   
            <button>Submit post</button>
            {error && <div className="error">{error}</div>}  
        </form>
    )
}

export default ConversationCreate