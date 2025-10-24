import React from 'react';

const QuantityCounter = ({ quantity, onIncrease, onDecrease }) => (
  <div className="counter-container">
    <button onClick={onDecrease} disabled={quantity <= 0}>-</button>
    <span>{quantity}</span>
    <button onClick={onIncrease}>+</button>
  </div>
);

export default QuantityCounter;
