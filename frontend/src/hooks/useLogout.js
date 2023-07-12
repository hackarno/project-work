import { useAuthContext } from "./useAuthContext"
import { useConversationContext } from "./useConversationContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: conversationsDispatch } = useConversationContext()

    const logout = () => {
        //Remove user (email+jwt) from local storage
        localStorage.removeItem("user")

        //Dispatch logout action
        dispatch({type: "LOGOUT"})
        //Clearing conversations from state to prevent one after other log ins to see data of previous users.
        conversationsDispatch({type: "SET_CONVERSATIONS", payload: null})
    }
    return {logout}
}