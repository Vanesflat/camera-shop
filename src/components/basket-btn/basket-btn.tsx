import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getTotalCount } from '../../store/reducers/basket/selectors';

function BasketBtn(): JSX.Element {
  const totalCount = useAppSelector(getTotalCount);

  return (
    <Link className="header__basket-link" to={AppRoute.Basket} data-testid="basket-btn">
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {totalCount ? <span className="header__basket-count">{totalCount}</span> : ''}
    </Link>
  );
}

export default BasketBtn;
