import { Fragment } from 'react';
import { Link } from 'react-router';
import { OrderProduct } from './OrderProduct';

export function OrderDetailsGrid({ order, loadCart }) {
    return (
        <div className="order-details-grid">
            {order.products.map((orderProduct) => {
                return (
                    <OrderProduct
                        key={orderProduct.product.id}
                        order={order}
                        orderProduct={orderProduct}
                        loadCart={loadCart}
                    />
                );
            })}
        </div>
    );
}