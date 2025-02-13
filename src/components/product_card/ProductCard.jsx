import PropTypes from "prop-types";

function ProductCard({ productData}) {
    return (
        <div>
            <div>
                <img src={productData.image} alt={productData.title} />
            </div>

            <h4>{productData.title}</h4>
            <button>Add to Cart</button>
            <button>View Details</button>
        </div>
    );
}

ProductCard.propTypes = {
    productData: PropTypes.object.isRequired,
}

export { ProductCard };