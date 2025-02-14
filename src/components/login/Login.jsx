import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Login() {
  const [handleSubmit] = useOutletContext();
  const [username, setUsername] = useState("");

  return (
    <div>
      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(username);
        }}
      >
        <label htmlFor="username">
          Username :
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            required
          />
        </label>

        <button type="submit">Log in as User</button>
      </form>

      <button type="button">Log in as Guest</button>
    </div>
  );
}

export default Login;
