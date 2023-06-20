import { Category } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { changeCategory } from '../../store/reducers/filter/filter';
import { getCurrentCategory } from '../../store/reducers/filter/selectors';

function FilterByCategory(): JSX.Element {
  const currentCategory = useAppSelector(getCurrentCategory);

  const dispatch = useAppDispatch();

  const handleCnange = (category: Category) => {
    if (currentCategory === category) {
      dispatch(changeCategory(null));

      return;
    }

    dispatch(changeCategory(category));
  };


  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {Object.values(Category).map((category) => (
        <div className="custom-checkbox catalog-filter__item" key={category}>
          <label>
            <input
              type="checkbox"
              name="photocamera"
              checked={currentCategory === category}
              onChange={() => handleCnange(category)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{category}</span>
          </label>
        </div>
      )
      )}
    </fieldset>
  );
}

export default FilterByCategory;
