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
            productQuantity.find((p) => p.id === product.id)?.quantity 
          }
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          onEdit={handleEdit}      
          onDelete={handleDelete}  
        />
      ))}
    </div>
  );
}