import { Link } from 'react-router-dom';
import { SortType } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { changeSortType } from '../../store/reducers/sort/sort';
import { getCurrentSortType } from '../../store/reducers/sort/selectors';

function SortByType(): JSX.Element {
  const currentSortType = useAppSelector(getCurrentSortType);
  const dispatch = useAppDispatch();

  const handleClick = (text: SortType) => {
    dispatch(changeSortType(text));
  };

  return (
    <div className="catalog-sort__type" data-testid="sort-by-type">
      {Object.entries(SortType).map(([type, text]) => (
        <Link
          className="catalog-sort__btn-text"
          key={type}
          onClick={() => handleClick(text)}
          to={`?sortBy=${text}`}
        >
          <input
            type="radio"
            id={type}
            name="sort"
            checked={text === currentSortType}
            readOnly
          />
          <label htmlFor={type}>{text}</label>
        </Link>
      ))}
    </div>
  );
}

export default SortByType;
