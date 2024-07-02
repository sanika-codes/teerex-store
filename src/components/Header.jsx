import React from "react";
import "../styles/Header.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header() {
  const cartQuantity = useSelector((state) => state.cart.totalItems);
  return (
    <header>
      <div className="logo">
      <NavLink to="/">TeeRex Store</NavLink>
      </div>
      <div className="menu">
        <NavLink to="/" className='small-heading'>Products</NavLink>

        <NavLink to="/cart">
          <button aria-label="View Cart" id="cart">
            <svg
              aria-hidden="true"
              role="img"
              id="rey-icon-bag-65cc290f16647"
              className="rey-icon rey-icon-bag "
              viewBox="0 0 24 24"
            >
              <path d="M21,3h-4.4C15.8,1.2,14,0,12,0S8.2,1.2,7.4,3H3C2.4,3,2,3.4,2,4v19c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1V4  C22,3.4,21.6,3,21,3z M12,1c1.5,0,2.8,0.8,3.4,2H8.6C9.2,1.8,10.5,1,12,1z M20,22H4v-4h16V22z M20,17H4V5h3v4h1V5h8v4h1V5h3V17z"></path>
            </svg>
            <span>{cartQuantity}</span>
          </button>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
