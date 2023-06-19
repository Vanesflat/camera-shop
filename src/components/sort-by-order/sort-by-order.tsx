import { generatePath, Link, useNavigate } from 'react-router-dom';
import { URLSearchParams } from 'url';
import { AppRoute, SortOrder, sortOrderQueryValue } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { changeSortOrder } from '../../store/reducers/sort/sort';
import { getCurrentSortOrder } from '../../store/reducers/sort/selectors';

type SortByOrderProps = {
  currentPage: number;
  searchParams: URLSearchParams;
};

function SortByOrder({ currentPage, searchParams }: SortByOrderProps): JSX.Element {
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const orderParam = searchParams.get('order');

  const handleClick = (text: SortOrder) => {
    dispatch(changeSortOrder(text));

    navigate({
      pathname: `${generatePath(AppRoute.Catalog, { page: `page_${currentPage}` })}`,
      search: searchParams.toString()
    });
  };

  return (
    <div className="catalog-sort__order" >
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
            checked={text === currentSortOrder || orderParam === sortOrderQueryValue[text]}
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
