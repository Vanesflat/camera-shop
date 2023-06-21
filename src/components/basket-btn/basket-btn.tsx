import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function BasketBtn(): JSX.Element {
  return (
    <Link className="header__basket-link" to={AppRoute.Basket} data-testid="basket-btn">
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
    </Link>
  );
}

export default BasketBtn;
