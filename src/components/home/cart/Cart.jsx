import PropTypes from "prop-types";
import CartCard from "./CartCard";
import styles from "./Cart.module.css";

function Cart({ cart, handleClearCart, handleRemoveFromCart }) {
  const totalPrice = cart.reduce((accu, next) => {
    return accu + next.price * next.quantity;
  }, 0);

  return (
    <div>
      <div className={styles["cartMain"]}>
        <p className={styles.total}>Total : ${totalPrice}</p>
        <div className={styles["button-container"]}>
          <button
            className={styles["checkout-button"]}
            onClick={() =>
              alert(
                "This is frontend only so this functionality hasn't been implemented"
              )
            }
          >
            Checkout
          </button>
          <button
            className={styles["clear-button"]}
            onClick={() => handleClearCart()}
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className={styles["cartProducts"]}>
        {cart.map((data) => (
          <CartCard
            key={data.id}
            productData={data}
            handleRemoveFromCart={handleRemoveFromCart}
          ></CartCard>
        ))}
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  handleClearCart: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
};

export default Cart;
