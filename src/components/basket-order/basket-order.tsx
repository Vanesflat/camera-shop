import cn from 'classnames';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getBasketCameras, getDiscountPercent } from '../../store/reducers/basket/selectors';
import { getDiscount, getFinalPrice, getTotalPrice } from '../../utils/common';

function BasketOrder(): JSX.Element {
  const basketCameras = useAppSelector(getBasketCameras);
  const discountPercent = useAppSelector(getDiscountPercent);

  const totalPrice = getTotalPrice(basketCameras);
  const discount = getDiscount(totalPrice, discountPercent);
  const finalPrice = getFinalPrice(totalPrice, discount);

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{totalPrice} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className={cn('basket__summary-value', discount && 'basket__summary-value--bonus')}>{discount} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{finalPrice} ₽</span>
      </p>
      <button className="btn btn--purple" type="submit">Оформить заказ</button>
    </div>
  );
}

export default BasketOrder;
