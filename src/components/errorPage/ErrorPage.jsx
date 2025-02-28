import { NavLink } from "react-router-dom";
import styles from "./ErrorPage.module.css"

function ErrorPage() {
  return (
    <>
      <div className={styles["errorPage"]}>
          <h1>
            Uh oh something went Wrong, Click the link below to go back to homepage
          </h1>
          <NavLink to={"/"}>Back to home</NavLink>
      </div>
    </>
  );
}

export default ErrorPage;
