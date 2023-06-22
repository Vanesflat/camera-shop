import cn from 'classnames';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utils/common';

type BasketItemProps = {
  camera: Camera;
  isBasketPage?: boolean;
};

function BasketItem({ camera, isBasketPage = false }: BasketItemProps): JSX.Element {
  return (
    <li className={cn('basket-item', !isBasketPage && 'basket-item--short')}>
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
          <img
            src={camera.previewImg}
            srcSet={camera.previewImg2x}
            width="140"
            height="120"
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул: </span>
            <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{camera.type} {camera.category.toLowerCase()}</li>
          <li className="basket-item__list-item">{camera.level} уровень</li>
        </ul>
        {!isBasketPage &&
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽
          </p>}
      </div>
      {isBasketPage &&
        <>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽
          </p>
          <div className="quantity">
            <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара">
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <label className="visually-hidden" htmlFor="counter1"></label>
            <input type="number" id="counter1" defaultValue="2" min="1" max="99" aria-label="количество товара" />
            <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>37 940 ₽</div>
          <button className="cross-btn" type="button" aria-label="Удалить товар">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </>}
    </li>
  );
}

export default BasketItem;
