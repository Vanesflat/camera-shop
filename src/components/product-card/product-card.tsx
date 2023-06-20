import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PRODUCT_TAB } from '../../const';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utils/common';
import Rating from '../rating/rating';

type ProductCardProps = {
  style?: CSSProperties;
  camera: Camera;
}

function ProductCard({ style, camera }: ProductCardProps): JSX.Element {
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
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${String(camera.id)}?tab=${DEFAULT_PRODUCT_TAB}`}>Подробнее</Link>
      </div>
    </div>
  );
}

export default ProductCard;
