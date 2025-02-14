import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSubmit(name) {
    setUsername(name);
    setIsLoggedIn(true);
  }

  return <Outlet context={[handleSubmit]}></Outlet>;
}

export default App;
