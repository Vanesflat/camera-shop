import { Link } from 'react-router-dom';
import { SortOrder, sortOrderQueryValue } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { changeSortOrder } from '../../store/reducers/sort/sort';
import { getCurrentSortOrder } from '../../store/reducers/sort/selectors';

function SortByOrder(): JSX.Element {
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const dispatch = useAppDispatch();

  const handleClick = (text: SortOrder) => {
    dispatch(changeSortOrder(text));
  };

  return (
    <div className="catalog-sort__order" data-testid="sort-by-order">
      {Object.entries(SortOrder).map(([type, text]) => (
        <Link
          className={`catalog-sort__btn catalog-sort__btn--${type.toLowerCase()}`}
          key={type}
          onClick={() => handleClick(text)}
          to={`?order=${sortOrderQueryValue[text]}`}
        >
          <input
            type="radio"
            id={type}
            name="sort-icon"
            aria-label={text}
            checked={text === currentSortOrder}
            readOnly
          />
          <label htmlFor={type}>
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#icon-sort"></use>
            </svg>
          </label>
        </Link>
      ))}
    </div>
  );
}

export default SortByOrder;
