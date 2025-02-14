import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  function handleSubmit(name) {
    setUsername(name);
    setIsLoggedIn(true);
    navigate("/")
  }

  useEffect(() => {
    if(!isLoggedIn)
      navigate("/login")
    else if (isLoggedIn)
      navigate("/home")
  }, [isLoggedIn, navigate])

  return <Outlet context={[handleSubmit]}></Outlet>;
}

export default App;
