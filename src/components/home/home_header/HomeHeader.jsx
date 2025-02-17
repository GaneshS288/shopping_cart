import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cartIcon from "../../../assets/shopping-cart.svg";
import userAvatar from "../../../assets/avatar-icon.svg"
import styles from "./HomeHeader.module.css"

function HomeHeader({ userName, cartItemCount }) {
  return (
    <div className={styles["header-container"]}>
      <NavLink to={"/home"} className={styles["header__title"]}>BlazingCart</NavLink>

      <div className={styles["header-container__right"]}>
        <NavLink to={"/home/cart"}>
          <div className={styles["cartIcon-container"]}>
            <img src={cartIcon} alt="cart-icon" className={styles.cartIcon} />
            {cartItemCount > 0 ? (
              <span data-testid="cartItemCount" className={styles["cartItemCount"]}>{cartItemCount}</span>
            ) : null}
          </div>
        </NavLink>

        <div className={styles["user-container"]}>
          <img src={userAvatar} alt="user avatar" className={styles.userAvatar} />
          <p className={styles.username}>{userName}</p>
        </div>
      </div>
    </div>
  );
}

HomeHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  cartItemCount: PropTypes.number.isRequired,
};

export default HomeHeader;
