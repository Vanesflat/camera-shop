import cn from 'classnames';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { postOrder } from '../../store/reducers/basket/api-actions';
import { getBasketCameras, getCoupon, getDiscountPercent, getOrderStatus } from '../../store/reducers/basket/selectors';
import { getDiscount, getFinalPrice, getTotalPrice } from '../../utils/common';
import Loader from '../loader/loader';

function BasketOrder(): JSX.Element {
  const basketCameras = useAppSelector(getBasketCameras);
  const discountPercent = useAppSelector(getDiscountPercent);
  const currentCoupon = useAppSelector(getCoupon);
  const orderStatus = useAppSelector(getOrderStatus);

  const camerasIds = basketCameras.reduce((acc: number[], camera) => {
    acc.push(camera.id);

    return acc;
  }, []);

  const totalPrice = getTotalPrice(basketCameras);
  const discount = getDiscount(totalPrice, discountPercent);
  const finalPrice = getFinalPrice(totalPrice, discount);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(postOrder({ camerasIds: camerasIds, coupon: currentCoupon }));
  };

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
      <button className="btn btn--purple" onClick={handleClick}>
        {orderStatus.isLoading ? <Loader isSmall /> : 'Оформить заказ'}
      </button>
    </div>
  );
}

export default BasketOrder;
