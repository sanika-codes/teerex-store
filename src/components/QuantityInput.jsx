import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

function QuantityInput({ item, quantityChanged }) {
  const [addToCartQty, setAddToCartQty] = useState(item.quantity);
  const [invalidQty, setInvalidQty] = useState(false);

  let initialRender = useRef(true);
  let errorNoticeRef = useRef(null);

  useEffect(() => {
    if (!initialRender.current) {
      quantityChanged(item, addToCartQty);
    }
    initialRender.current = false;
  }, [addToCartQty]);

  useEffect( () => {
    errorNoticeRef.current = setTimeout( ( ) => {
      setInvalidQty(false);
    }, 2000);

    return () => {
      clearTimeout(errorNoticeRef.current);
    };
  }, [invalidQty])

  const reduceQty = (event) => {
    event.preventDefault();
    if (addToCartQty > 0)
      setAddToCartQty((addToCartQty) => {
        if(addToCartQty - 1 <= item.stock)
          setInvalidQty(false);
        return parseInt(addToCartQty - 1);
      });
  };

  const increaseQty = (event) => {
    event.preventDefault();
    setAddToCartQty((addToCartQty) => {
      if(addToCartQty + 1 > item.stock) {
        setInvalidQty(true);
        return addToCartQty;
      }

      return parseInt(addToCartQty + 1);
    });
  };

  const updateQty = (event) => {
    setAddToCartQty((addToCartQty) => {
      if(event.target.value === '')
        return 1;
      return parseInt(event.target.value);
    });
  };

  return (
    <td className="product-quantity">
      <div className="quantity">
        <div className="quantity-controls">
          <button className="minus-qty" onClick={(e) => reduceQty(e)}>
            -
          </button>
          <input
            id={item.name + item.id + "-input"}
            type="number"
            min={1}
            max={item.stock}
            step={1}
            value={addToCartQty}
            aria-invalid={invalidQty}
            aria-errormessage="notices"
            className="qty"
            onChange={(e) => {
              updateQty(e);
            }}
          />
          <button className="plus-qty" onClick={(e) => increaseQty(e)}>
            +
          </button>
            {
              invalidQty && createPortal( <p> Sorry, we only have { item.stock} quantity for { item.name}. </p>, document.getElementById('notices'))
            }
        </div>
      </div>
    </td>
  );
}

export default QuantityInput;
