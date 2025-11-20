import ProductCard from "./ProductCard";

export default function ProductsContainer({
  productData,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="ProductsContainer">
      {productData && productData.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          productQuantity={
            productQuantity.find((p) => p.id === product.id)?.quantity || 0
          }
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          onEdit={handleEdit}      // Pass handleEdit as onEdit
          onDelete={handleDelete}  // Pass handleDelete as onDelete
        />
      ))}
    </div>
  );
}