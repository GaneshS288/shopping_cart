import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./ProductCard.module.css";

function ProductCard({ productData }) {
  return (
    <div>
      <div>
        <img src={productData.image} alt={productData.title} />
      </div>

      <h4>{productData.title}</h4>
      <button>Add to Cart</button>
      <button>
        <NavLink to={`/home/products/${productData.id}`}>View Details</NavLink>
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  productData: PropTypes.object.isRequired,
};

export { ProductCard };
