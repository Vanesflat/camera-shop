import { Camera } from '../../types/camera';
import ProductCard from '../product-card/product-card';

type ProductCardsListProps = {
  cameras: Camera[];
}

function ProductCardsList({ cameras }: ProductCardsListProps): JSX.Element {
  return (
    <div className="cards catalog__cards" data-testid="product-cards-list">
      {cameras.map((camera) => <ProductCard camera={camera} key={camera.id} />)}
    </div>
  );
}

export default ProductCardsList;
