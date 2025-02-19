import PropTypes from "prop-types";

function Cart ({cart, handleClearCart}) {
    const totalPrice = cart.reduce((accu, next) => {
        return accu + (next.price * next.quantity);
    }, 0)

    return (
        <div>
            <p>Total : ${totalPrice}</p>
            
            <div>
                <button>Checkout</button>
                <button>Clear Cart</button>
            </div>
        </div>
    )
}

Cart.propTypes = {
    cart: PropTypes.array.isRequired,
}

export default Cart;