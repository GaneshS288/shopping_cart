import { ProductCard } from "../../product_card/ProductCard";
import PropTypes from "prop-types";
import styles from "./Products.module.css"

function Products({ productsData }) {
  return (
    <div className={styles["products"]}>
      {productsData?.map((data) => (
        <ProductCard key={data.id} productData={data}></ProductCard>
      ))}
    </div>
  );
}

Products.propTypes = {
  productsData: PropTypes.array.isRequired,
};

export default Products;
