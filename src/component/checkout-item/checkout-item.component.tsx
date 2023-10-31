import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

// Define the type for a single product item
interface CartProduct {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutItemProps {
  cartItem: CartProduct;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemFromCartHelper = () => {
    clearItemFromCart(cartItem);
  };
  const addItemToCartHelper = () => {
    addItemToCart(cartItem);
  };
  const removeItemFromCartHelper = () => {
    removeItemFromCart(cartItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemFromCartHelper}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHelper}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemFromCartHelper}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
