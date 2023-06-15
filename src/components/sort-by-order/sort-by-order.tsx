import { SortOrder } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { changeSortOrder } from '../../store/reducers/app/app';
import { getCurrentSortOrder } from '../../store/reducers/app/selectors';

function SortByOrder(): JSX.Element {
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const dispatch = useAppDispatch();

  return (
    <div className="catalog-sort__order" >
      {Object.entries(SortOrder).map(([type, text]) => (
        <div
          className={`catalog-sort__btn catalog-sort__btn--${type.toLowerCase()}`}
          key={type}
          onClick={() => {
            dispatch(changeSortOrder(text as SortOrder));
          }}
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
        </div>
      ))}
    </div>
  );
}

export default SortByOrder;
