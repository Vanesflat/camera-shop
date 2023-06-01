import ProductCard from '../product-card/product-card';

function ProductCardsList(): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {Array.from({ length: 5 }).map((_, i) => <ProductCard key={i} />)}
    </div>
  );
}

export default ProductCardsList;
