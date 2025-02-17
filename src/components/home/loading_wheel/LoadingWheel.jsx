import styles from "./LoadingWheel.module.css";

function LoadingWheel() {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles["loader"]}></div>
      <p className={styles["loading-text"]}>Loading</p>
    </div>
  );
}

export default LoadingWheel;
