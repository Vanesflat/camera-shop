import { Link } from 'react-router-dom';
import { URLSearchParams } from 'url';
import { SortType, sortTypeQueryValue } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { changeSortType } from '../../store/reducers/sort/sort';
import { getCurrentSortType } from '../../store/reducers/sort/selectors';

type SortByTypeProps = {
  searchParams: URLSearchParams;
};

function SortByType({ searchParams }: SortByTypeProps): JSX.Element {
  const currentSortType = useAppSelector(getCurrentSortType);
  const dispatch = useAppDispatch();

  const typeParam = searchParams.get('sortBy');

  const handleClick = (text: SortType) => {
    dispatch(changeSortType(text));
  };

  return (
    <div className="catalog-sort__type">
      {Object.entries(SortType).map(([type, text]) => (
        <Link
          className="catalog-sort__btn-text"
          key={type}
          onClick={() => handleClick(text)}
          to={`?sortBy=${sortTypeQueryValue[text]}`}
        >
          <input
            type="radio"
            id={type}
            name="sort"
            checked={text === currentSortType || typeParam === sortTypeQueryValue[text]}
            readOnly
          />
          <label htmlFor={type}>{text}</label>
        </Link>
      ))}
    </div>
  );
}

export default SortByType;
