import {useState} from "react"
import { useRegister } from "../hooks/useRegister"
import { Link } from "react-router-dom"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {register, isLoading, error} = useRegister()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await register(email, password);
    }

    return (
        <>
        <form className="register" onSubmit={handleSubmit}>
            <h3>Register</h3>
            <label>Email:</label>
            <input
                type= "email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button diabled={isLoading}>Register</button>
            {error && <div className="error">{error}</div>}
        </form>
        <p>Already have an account?</p>
        <Link to="/login" >Log in here!</Link>
        </>
    )

}

export default Register