import { Link } from 'react-router';
import dayjs from "dayjs";
import axios from 'axios';

export function OrderProduct({ order, orderProduct, loadCart }) {
    const addToCart = async () => {
        await axios.post('/api/cart-items', {
            productId: orderProduct.product.id,
            quantity: 1
        });

        await loadCart();
    }

    return (
        <>
            <div className="product-image-container">
                <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
                <div className="product-name">
                    {orderProduct.product.name}
                </div>
                <div className="product-delivery-date">
                    Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs)
                        .format('MMMM D')}
                </div>
                <div className="product-quantity">
                    Quantity: {orderProduct.quantity}
                </div>
                <button className="buy-again-button button-primary">
                    <img className="buy-again-icon" src="images/icons/buy-again.png" />
                    <span
                        className="buy-again-message"
                        onClick={addToCart}>Add to Cart</span>
                </button>
            </div>

            <div className="product-actions">
                <Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
                    <button className="track-package-button button-secondary">
                        Track package
                    </button>
                </Link>
            </div>
        </>
    );
}