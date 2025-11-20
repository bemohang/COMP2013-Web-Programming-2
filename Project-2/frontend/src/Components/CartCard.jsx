// Import QuantityCounter component for cart quantity management
import QuantityCounter from "./QuantityCounter";

// Cart card component - displays individual cart item with actions
export default function CartCard({
  id,                    // Product ID for identification
  image,                 // Product image URL for display
  productName,           // Product name for identification
  price,                 // Individual product price
  quantity,              // Current quantity in cart
  handleRemoveFromCart,  // Function to remove item from cart
  handleAddQuantity,     // Function to increase quantity in cart
  handleRemoveQuantity,  // Function to decrease quantity in cart
}) {
  return (
    <div className="CartCard">
      {/* Left section - product information and quantity controls */}
      <div className="CartCardInfo">
        {/* Product image with alt text for accessibility */}
        <img src={image} alt={productName} />
        
        {/* Product name display */}
        <p>{productName}</p>
        
        {/* Individual product price */}
        <p>{price}</p>
        
        {/* Quantity counter for cart - allows quantity adjustments */}
        <QuantityCounter
          id={id}
          productQuantity={quantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          mode="cart"  // Set to cart mode for specific behavior
        />
      </div>

      {/* Right section - total calculation and remove action */}
      <div>
        {/* Calculate and display line total (price * quantity) */}
        <h3>
          Total: ${(parseFloat(price.replace("$", "")) * quantity).toFixed(2)}
        </h3>
        
        {/* Remove button - removes this item from cart */}
        <button
          onClick={() => handleRemoveFromCart(id)}
          className="RemoveButton"
        >
          Remove
        </button>
      </div>
    </div>
  );
}