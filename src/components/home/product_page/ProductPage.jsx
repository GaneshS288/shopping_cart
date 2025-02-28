import PropTypes from "prop-types";
import starIcon from "../../../assets/rating-star.svg";
import { useState } from "react";
import styles from "./ProductPage.module.css";

function ProductPage({ productData, handleAddToCart, handleRemoveFromCart, cart }) {
  const [quantity, setQuantity] = useState(1);
  const productCountInCart = getProductsInCartCount();

  function getProductsInCartCount() {
    const productInCart = cart.find((data) => data.id === productData.id);
    return productInCart ? productInCart.quantity : 0;
  }

  return (
    <div className={styles["productPage"]}>
      <div className={styles["productImage-container"]}>
        <img
          src={productData.image}
          alt={productData.title}
          className={styles["productImage"]}
        />
      </div>
      <div className={styles["information-container"]}>
        <h2 className={styles["productTitle"]}>{productData.title}</h2>
        <p className={styles["productDescription"]}>
          {productData.description}
        </p>
        <div className={styles["flex-column"]}>
          <div className={styles["priceRatingContainer"]}>
            <p>${productData.price}</p>
            <div>
              <p className={styles["rating-container"]}>
                {productData.rating.rate}
                <img
                  src={starIcon}
                  alt="rating icon"
                  className={styles["starIcon"]}
                />
                ({productData.rating.count})
              </p>
            </div>
          </div>

          <div className={styles["addToCart-container"]}>
            <button
              className={`${styles["buttons"]} ${styles["addToCartButton"]}`}
              onClick={() =>
                handleAddToCart({ ...productData, quantity: quantity })
              }
            >
              Add to Cart
            </button>
            <div className={styles["quantity-container"]}>
              <button
                aria-labelledby="decrement"
                className={styles["quantity-buttons"]}
                onClick={() => setQuantity(quantity - 1 < 1 ? 1 : quantity -1)}
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                aria-labelledby="increment"
                className={styles["quantity-buttons"]}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles["removeButton-container"]}>
            <button
              className={`${styles["buttons"]} ${styles["removeButton"]}`}
              onClick={() => handleRemoveFromCart(productData)}
            >
              Remove
            </button>
            {productCountInCart > 0 ? <p className={styles["cartQuantity"]}>
              ({productCountInCart} in cart)
            </p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

ProductPage.propTypes = {
  productData: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array
};

export default ProductPage;
