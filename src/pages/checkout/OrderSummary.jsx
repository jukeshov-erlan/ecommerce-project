import DeliveryOptions from "./DeliveryOptions";
import CartItemDetails from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";

export default function OrderSummary({ deliveryOptions, cart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
       
          return (
            <div key={cartItem.id} className="cart-item-container">
              <DeliveryDate deliveryOptions={deliveryOptions} cartItem={cartItem}/>

              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem}/>
                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
