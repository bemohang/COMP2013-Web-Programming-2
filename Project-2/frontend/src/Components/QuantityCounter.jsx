export default function QuantityCounter({
  productQuantity,       
  handleAddQuantity,   
  handleRemoveQuantity,   
  id,                   
  mode,                  
}) {
  return (
    <div className="ProductQuantityDiv">
      {/* Decrease quantity button - calls remove function with ID and mode */}
      <div>
        <button onClick={() => handleRemoveQuantity(id, mode)}>
          -
        </button>
      </div>
      
      {/* Current quantity display - shows selected quantity */}
      <p>{productQuantity}</p>
      
      {/* Increase quantity button - calls add function with ID and mode */}
      <div>
        <button onClick={() => handleAddQuantity(id, mode)}>
          +
        </button>
      </div>
    </div>
  );
}