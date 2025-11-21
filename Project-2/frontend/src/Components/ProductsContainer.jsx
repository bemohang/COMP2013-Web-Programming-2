import ProductCard from "./ProductCard";

export default function ProductsContainer({
  products,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productQuantity,
  handleDelete,
  handleEdit,
}) {

  if (!products || !Array.isArray(products)) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="ProductsContainer">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product} 
          productQuantity={
            productQuantity.find((p) => p.id === product._id)?.quantity || 0
          }
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}
