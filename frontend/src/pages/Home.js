import { useEffect } from "react";
import { useConversationContext } from "../hooks/useConversationContext"
import { useAuthContext} from "../hooks/useAuthContext"

//Components
import ConversationPreview from "../components/ConversationPreview";
import ConversationCreate from "../components/ConversationCreate";

const Home = () => {

    //const [conversations, setConversations] = useState(null)

    const {conversations, dispatch} = useConversationContext()
    const {user} = useAuthContext();

    //Data fetched only when page is first rendered (empty array in the end of useEffect)
    useEffect(() => {
        const fetchConversations = async () => {
            const response = await fetch("http://localhost:4000/api/conversations", {
               /*  headers: {
                    "Authorization": `Bearer ${user.token}`
                } */
            })
            const json = await response.json()

            if (response.ok) {
                //setConversations(json)
                dispatch({type: "SET_CONVERSATIONS", payload: json})
            }
        }
        
        //Conversations are fetched calling the async function
        fetchConversations() 

    }, [dispatch, user])

    return (
        <div className="home">
            {user ? <ConversationCreate /> : <p>Welcome to the forum! Please log in to comment and create posts.</p>}
            <div className="conversations">
                <h3>Posts</h3>
                {conversations && conversations.map((conversation) => (
                    <ConversationPreview key= {conversation._id} conversation={conversation} />
                ))}
            </div>
        </div>
    )
}

export default Home;