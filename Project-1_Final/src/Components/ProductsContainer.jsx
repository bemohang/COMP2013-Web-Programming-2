import ProductCard from "./ProductCard";

//diplays all product in a grid layout
export default function ProductsContainer({
  data,
  productQuantity,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {

  
  return (
    <div className="ProductsContainer">
      {data.map((product) => {
        const quantityData = productQuantity.find(prod => prod.id === product.id);
        return (
          <ProductCard
            key={product.id}
            productName={product.productName}
            brand={product.brand}
            image={product.image}
            price={product.price}
            productQuantity={quantityData}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
          />
        );
      })}
    </div>
  );
}