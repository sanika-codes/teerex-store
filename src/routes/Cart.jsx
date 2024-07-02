import React from "react";
import "../styles/Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/store";
import QuantityInput from "../components/QuantityInput";


function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
 

  const quantityChangeHandler = (item, quantity) => {
    
    if(quantity === 0)
    dispatch(
      cartActions.removeItem(
        item
      )
    );
    else
    dispatch(
      cartActions.updateItem({
        id: item.id,
        quantity,
        price: item.price,
      })
    );
  };

  const deleteItemHandler = (item) => {
    dispatch(cartActions.removeItem(item));
  };

  return (
    <main id="cart-main">
      <div id="notices">

      </div>
      <h1 className="medium-heading">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <form>
          <table >
            <thead>
              <tr>
                <th className="product-name">Product</th>
                <th className="product-price">Price</th>
                <th className="product-quantity">Quantity</th>
                <th className="product-subtotal">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr className="" key={item.id}>
                    <td className="product-name">
                      <img
                        decoding="async"
                        src={item.imageURL}
                        alt={item.name}
                      />
                      <h3>{item.name}</h3>
                    </td>

                    <td className="product-price">
                      <span className="currency">Rs </span>
                      {item.price}
                    </td>

                    <QuantityInput
                      item={item}
                      quantityChanged={quantityChangeHandler}
                    />

                    <td className="product-subtotal" data-title="Subtotal">
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                          Rs
                        </span>
                        {item.price * item.quantity}
                      </span>
                    </td>

                    <td className="delete">
                      <button
                        className="small-heading"
                        onClick={(event) => {
                          event.preventDefault();
                          deleteItemHandler(item);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="small-heading">
                <td colSpan={3} >Total</td>
                <td>Rs {totalAmount}</td>
              </tr>
            </tfoot>
          </table>
        </form>
      ) : (
        <p>There are no items in your cart</p>
      )}
    </main>
  );
}

export default Cart;
