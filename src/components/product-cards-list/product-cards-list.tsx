import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCameras } from '../../store/reducers/cameras/selectors';
import ProductCard from '../product-card/product-card';

function ProductCardsList(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => <ProductCard camera={camera} key={camera.id} />)}
    </div>
  );
}

export default ProductCardsList;
