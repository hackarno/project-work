import { useEffect, useId } from "react";
import { useConversationContext } from "../hooks/useConversationContext"
import { useAuthContext} from "../hooks/useAuthContext"
import { useParams, Link } from "react-router-dom";

//Components
import ConversationFocus from "../components/ConversationFocus";
import CommentCreate from "../components/CommentCreate";

//Extracting single conversation id before fetching up to date conversation from db

const Conversation = () => {

    const {id} = useParams();
    
    //const [conversation, setConversation] = useState(null)

    const {conversation, dispatch} = useConversationContext()
    const {user} = useAuthContext();
 
    const conversationUrl = "http://localhost:4000/api/conversations/" + id;

    //Data fetched only when page is first rendered (empty array in the end of useEffect)
    useEffect(() => {
        const fetchConversation = async () => {
            const response = await fetch(conversationUrl, {
             
            })
            const json = await response.json()

            if (response.ok) {
                //setConversation(json)
                dispatch({type: "SET_CONVERSATION", payload: json})
            }
        }
        
        //Conversation is fetched calling the async function
        fetchConversation() 

    }, [dispatch, conversationUrl]) 

    const idKey = useId()

    return (
        <div className="home">
            <Link to="/">Return to main page</Link>
            {!user && <p>Please log in to comment and create posts.</p>}
            <div>
                {conversation && <ConversationFocus key= {conversation._id} conversation={conversation} />}
            </div>
            {user && <div><CommentCreate key={idKey} conversation={conversation} /></div>}
        </div>
    )

}



export default Conversation;