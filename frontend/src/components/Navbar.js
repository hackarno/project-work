import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    //Links prsented in the navbar are dependent on user's login status

    return (
        <header>
            <div className="container">
                <Link to= "/">
                    <h1>Snippet && problem</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>Logged in as: {user.email} </span>
                            <button onClick={handleClick} className="logoutButton">Log out</button>
                        </div> 
                    )}
                    {!user && (
                        <div>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Log in</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;