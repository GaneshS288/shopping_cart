import PropTypes from "prop-types";
import styles from "./CartCard.module.css";
import starIcon from "../../../assets/rating-star.svg";
import { NavLink } from "react-router-dom";

function CartCard({ productData, handleRemoveFromCart }) {
  return (
    <div className={styles["productCard-container"]}>
      <div>
        <img
          src={productData.image}
          alt={productData.title}
          className={styles["product-img"]}
          loading="lazy"
        />
      </div>

      <h4 className={styles["product-title"]}>{productData.title}</h4>

      <div className={styles["priceAndRating-container"]}>
        <p>${productData.price}</p>
        <p>
          {productData.rating.rate}{" "}
          <img src={starIcon} alt="star icon" className={styles["star-icon"]} />
          ({productData.rating.count} reviews)
        </p>
      </div>

      <div className={styles["detailsAndRemoveButton-container"]}>
        <button className={styles["details-button"]}>
          <NavLink
            to={`/home/products/${productData.id}`}
            className={styles["details-link"]}
          >
            View Details
          </NavLink>
        </button>

        <button
          type="button"
          onClick={() => handleRemoveFromCart(productData)}
          className={styles["remove-button"]}
        >
          Remove
        </button>
      </div>

      {productData.quantity > 0 ? (
        <p className={styles["product-count-in-cart"]}>
          ({productData.quantity} in cart)
        </p>
      ) : null}
    </div>
  );
}

CartCard.propTypes = {
  productData: PropTypes.object.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
};

export default CartCard;
