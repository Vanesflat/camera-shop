import cn from 'classnames';
import { useState } from 'react';
import { BasketItemType } from '../../const';
import { Camera } from '../../types/camera';
import { formatPrice, getTotalProductPrice } from '../../utils/common';
import BasketRemoveCameraModal from '../basket-remove-camera-modal/basket-remove-camera-modal';
import { MAX_PRODUCT_COUNT, MIN_PRODUCT_COUNT } from './const';

type BasketItemProps = {
  camera: Camera;
  type: BasketItemType;
};

function BasketItem({ camera, type }: BasketItemProps): JSX.Element {
  const [openedRemoveModal, setOpenedRemoveModal] = useState(false);
  const [currentCount, setCurrentCount] = useState(camera.count);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCount(+evt.target.value);
  };

  const handleDeleteClick = () => {
    setOpenedRemoveModal(true);
  };

  const handleRemoveModalCloseClick = () => {
    setOpenedRemoveModal(false);
  };

  return (
    <li className={cn('basket-item', type !== BasketItemType.Standart && 'basket-item--short')}>
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
          <li className="basket-item__list-item">{camera.type} камера</li>
          <li className="basket-item__list-item">{camera.level} уровень</li>
        </ul>
        {type === BasketItemType.Add &&
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽
          </p>}
      </div>
      {type === BasketItemType.Standart &&
        <>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽
          </p>
          <div className="quantity">
            <button
              className="btn-icon btn-icon--prev"
              aria-label="уменьшить количество товара"
              disabled={camera.count === MIN_PRODUCT_COUNT}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <label className="visually-hidden" htmlFor="counter1"></label>
            <input
              type="number"
              id="counter1"
              value={currentCount || ''}
              min="1"
              max="99"
              aria-label="количество товара"
              onChange={handleChange}
            />
            <button
              className="btn-icon btn-icon--next"
              aria-label="увеличить количество товара"
              disabled={camera.count === MAX_PRODUCT_COUNT}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{getTotalProductPrice(camera.price, currentCount)} ₽</div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Удалить товар"
            onClick={handleDeleteClick}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
          <BasketRemoveCameraModal
            camera={camera}
            isOpen={openedRemoveModal}
            onCloseCLick={handleRemoveModalCloseClick}
          />
        </>}
    </li>
  );
}

export default BasketItem;
