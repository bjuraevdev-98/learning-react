import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdate, setIsUpdate] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const changeQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const updateCartItem = async () => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: Number(quantity)
        });
        await loadCart();
    }

    const updateQuantity = () => {
        if (isUpdate) {
            setIsUpdate(false);
            updateCartItem();
        } else {
            setIsUpdate(true);
        }
    };

    const keyPressed = (event) => {
        if(event.key === 'Enter') {
            updateQuantity();
        } else if(event.key === 'Escape') {
            setQuantity(cartItem.quantity);
            setIsUpdate(false);
        }
    };

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity:
                        {isUpdate
                            ? <input
                                className="quantity-input"
                                value={quantity}
                                onChange={changeQuantity}
                                onKeyDown={keyPressed}
                                type="text" />
                            : <span className="quantity-label">
                                {cartItem.quantity}
                            </span>
                        }
                    </span>
                    <span
                        className="update-quantity-link link-primary"
                        onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}