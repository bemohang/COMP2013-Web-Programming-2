// Quantity counter component - handles product quantity adjustments
// Used in both product cards and cart items with different modes
export default function QuantityCounter({
  productQuantity,       // Current quantity value to display
  handleAddQuantity,     // Function to increase quantity (passed from parent)
  handleRemoveQuantity,  // Function to decrease quantity (passed from parent)  
  id,                    // Product ID for identifying which product to update
  mode,                  // Mode: "product" (main view) or "cart" (cart view)
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