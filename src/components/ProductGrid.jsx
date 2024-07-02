import React from "react";
import ProductCard from "./ProductCard";
import '../styles/Products.scss'

function ProductGrid({ products }) {
  
   return (<div className="product-grid">
    <ul>
      {
        products.map( product => {
          return <ProductCard key={product.id} id={product.id} imageURL={product.imageURL} name={product.name} price={product.price} stock={product.quantity}/>
        })
      }
    </ul>
  </div>)
}

export default ProductGrid;
