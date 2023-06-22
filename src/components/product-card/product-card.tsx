import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PRODUCT_TAB } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getBasketCameras } from '../../store/reducers/basket/selectors';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utils/common';
import Rating from '../rating/rating';

type ProductCardProps = {
  style?: CSSProperties;
  camera: Camera;
  setOpenedAddModal?: (arg: boolean) => void;
  setCurrentCamera?: (camera: Camera) => void;
}

function ProductCard({ style, camera, setOpenedAddModal, setCurrentCamera }: ProductCardProps): JSX.Element {
  const basketCameras = useAppSelector(getBasketCameras);

  const inBasket = basketCameras.find((basketCamera) => basketCamera.id === camera.id);

  const handleClick = () => {
    if (setOpenedAddModal && setCurrentCamera) {
      setOpenedAddModal(true);
      setCurrentCamera(camera);
    }
  };

  return (
    <div className="product-card is-active" style={style} data-testid="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
          <img
            src={camera.previewImg}
            srcSet={camera.previewImg2x}
            width="280"
            height="240"
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <Rating rating={camera.rating} reviewCount={camera.reviewCount} />
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {inBasket ?
          <Link className="btn btn--purple-border" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link> :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleClick}
          >
            Купить
          </button>}
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${String(camera.id)}?tab=${DEFAULT_PRODUCT_TAB}`}>Подробнее</Link>
      </div>
    </div>
  );
}

export default ProductCard;
