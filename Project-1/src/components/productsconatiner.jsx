import React from 'react';
import ProductCard from './productcard';

function ProductsContainer({ products, onAddToCart }) {
  const productCards = [];
  for (let i = 0; i < products.length; i++) {
    productCards.push(
      <ProductCard
        key={products[i].id}
        product={products[i]}
        onAddToCart={onAddToCart}
      />
    );
  }

  return <div className="ProductsContainer">{productCards}</div>;
}

export default ProductsContainer;
