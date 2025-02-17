import { ProductCard } from "../../product_card/ProductCard";
import PropTypes from "prop-types";

function Products({ productsData }) {
  return (
    <div>
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
