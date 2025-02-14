import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./Login.module.css"

function Login() {
  const {handleSubmit} = useOutletContext();
  const [username, setUsername] = useState("");

  return (
    <div className={styles["login-container"]}>
      <h1 className={styles.title}>BlazingCart</h1>

      <div>
        <form
          action=""
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(username);
          }}
          className={styles["login__form"]}
        >
          <label htmlFor="username" className={styles["form__label"]}>
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
        <button type="button" onClick={() => handleSubmit("Guest")}>
          Log in as Guest
        </button>
      </div>
    </div>
  );
}

export default Login;
