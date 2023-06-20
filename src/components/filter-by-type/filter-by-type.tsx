import { Category, Type } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { changeType } from '../../store/reducers/filter/filter';
import { getCurrentCategory, getCurrentTypes } from '../../store/reducers/filter/selectors';

function FilterByType(): JSX.Element {
  const currentTypes = useAppSelector(getCurrentTypes);
  const currentCategory = useAppSelector(getCurrentCategory);

  const isVideocamera = currentCategory === Category.Videocamera;

  const dispatch = useAppDispatch();

  const handleCnange = (type: Type) => {
    dispatch(changeType(type));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {Object.values(Type).map((type) => (
        <div className="custom-checkbox catalog-filter__item" key={type}>
          <label>
            <input
              type="checkbox"
              name="digital"
              checked={currentTypes.includes(type)}
              onChange={() => handleCnange(type)}
              disabled={isVideocamera && (type === Type.Instant || type === Type.Film)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{type}</span>
          </label>
        </div>
      )
      )}
    </fieldset>
  );
}

export default FilterByType;
