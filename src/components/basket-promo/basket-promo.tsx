import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Coupon } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { fetchDiscount } from '../../store/reducers/basket/api-actions';
import { setCoupon } from '../../store/reducers/basket/basket';
import { getDiscountStatus } from '../../store/reducers/basket/selectors';
import Loader from '../loader/loader';

type PromoFormField = {
  promo: Coupon;
};

function BasketPromo(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    },
  } = useForm<PromoFormField>({
    mode: 'onSubmit'
  });
  const discountStatus = useAppSelector(getDiscountStatus);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<PromoFormField> = (data) => {
    dispatch(fetchDiscount(data.promo));
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form
          action="#"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={cn('custom-input', errors.promo && 'is-invalid', isValid && 'is-valid')}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                {...register('promo', {
                  validate: {
                    positive: (value) => {
                      if (Object.values(Coupon).includes(value)) {
                        dispatch(setCoupon(value));
                        return true;
                      } else {
                        return false;
                      }
                    }
                  }
                })}
                type="text"
                name="promo"
                placeholder="Введите промокод"
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit">
            {discountStatus.isLoading ? <Loader isSmall /> : 'Применить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BasketPromo;
