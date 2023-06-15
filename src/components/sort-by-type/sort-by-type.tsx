import { SortType } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { changeSortType } from '../../store/reducers/app/app';
import { getCurrentSortType } from '../../store/reducers/app/selectors';

function SortByType(): JSX.Element {
  const currentSortType = useAppSelector(getCurrentSortType);
  const dispatch = useAppDispatch();

  return (
    <div className="catalog-sort__type">
      {Object.entries(SortType).map(([type, text]) => (
        <div
          className="catalog-sort__btn-text"
          key={type}
          onClick={() => {
            dispatch(changeSortType(text as SortType));
          }}
        >
          <input
            type="radio"
            id={type}
            name="sort"
            checked={text === currentSortType}
            readOnly
          />
          <label htmlFor={type}>{text}</label>
        </div>
      ))}
    </div>
  );
}

export default SortByType;
