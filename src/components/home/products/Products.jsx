import { ProductCard } from "../../product_card/ProductCard";
import PropTypes from "prop-types";
import styles from "./Products.module.css";

function Products({
  productsData,
  handleAddToCart,
  handleRemoveFromCart,
  cart,
}) {
  return (
    <div className={styles["products"]}>
      {productsData?.map((data) => (
        <ProductCard
          key={data.id}
          productData={data}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          cart={cart}
        ></ProductCard>
      ))}
    </div>
  );
}

Products.propTypes = {
  productsData: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

export default Products;
