import React from "react";
import { cartActions } from "../store/store";
import { useDispatch } from "react-redux";

function ProductCard({ id, imageURL, name, price, stock}) {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        imageURL,
        name,
        quantity: 1,
        price,
        stock
      })
    );

  };

  return (
    <li className="product-card" id={id}>
      <div className="product-wrapper">
        <img src={imageURL} alt={name} />
        <div className="product-details">
          <h2 className="medium-heading">{name}</h2>
          <span>{price}</span>
          <div className="add-to-cart-wrapper">
            <button onClick={addToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
