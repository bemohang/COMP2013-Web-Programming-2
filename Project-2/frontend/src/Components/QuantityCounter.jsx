export default function QuantityCounter({
  productQuantity,       
  handleAddQuantity,   
  handleRemoveQuantity,   
  id,                   
  mode,                  
}) {
  return (
    <div className="ProductQuantityDiv">
      {/* Decrease quantity button */}
      <div>
        <button onClick={() => handleRemoveQuantity(id, mode)}>
          -
        </button>
      </div>
      
      {/* Current quantity display */}
      <p>{productQuantity}</p>
      
      {/* Increase quantity button */}
      <div>
        <button onClick={() => handleAddQuantity(id, mode)}>
          +
        </button>
      </div>
    </div>
  );
}