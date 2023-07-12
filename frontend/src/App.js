import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext"

//Pages and components imports
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Conversation from "./pages/Conversation"

function App() {

  //Route navigation checks users authentication and redirects if not authentication
  const {user} = useAuthContext();
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />}></Route>
            <Route path="/conversation/:id" element={<Conversation />}></Route>
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
