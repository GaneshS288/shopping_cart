import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function HomeHeader({ userName, cartItemCount }) {
  return (
    <div>
      <NavLink to={"/home"}>BlazingCart</NavLink>

      <div>
        <button>
          <NavLink to={"/home/cart"}>
            <div>
              <img src="" alt="cart-icon" />
              {cartItemCount > 0 ? <span data-testid="cartItemCount">{cartItemCount}</span> : null}
            </div>
          </NavLink>
        </button>

        <div>
          <img src="" alt="user avatar" />
          <p>{userName}</p>
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
