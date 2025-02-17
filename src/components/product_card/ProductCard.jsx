import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./ProductCard.module.css";
import starIcon from "../../assets/rating-star.svg";
import { useState } from "react";

function ProductCard({ productData, handleAddToCart }) {
  const [quantity, setQuantity] = useState(1);

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

      <div className={styles["addToCart-container"]}>
        <button onClick={() => handleAddToCart({...productData, quantity: quantity})} className={styles["addToCart-button"]}>Add to Cart</button>
        <div className={styles["quantity-container"]}>
          <button aria-label="decrement" className={styles["quantity-button"]}>
            -
          </button>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            name="quantity"
            aria-label="quantity"
            className={styles["quantity-input"]}
          />
          <button aria-label="increment" className={styles["quantity-button"]}>
            +
          </button>
        </div>
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

        <button type="button" className={styles["remove-button"]}>
          Remove
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  productData: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export { ProductCard };
