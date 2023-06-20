import { Level } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { changeLevel } from '../../store/reducers/filter/filter';
import { getCurrentLevels } from '../../store/reducers/filter/selectors';

function FilterByLevel(): JSX.Element {
  const currentLevels = useAppSelector(getCurrentLevels);

  const dispatch = useAppDispatch();

  const handleCnange = (level: Level) => {
    dispatch(changeLevel(level));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {Object.values(Level).map((level) => (
        <div className="custom-checkbox catalog-filter__item" key={level}>
          <label>
            <input
              type="checkbox"
              name="zero"
              checked={currentLevels.includes(level)}
              onChange={() => handleCnange(level)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{level}</span>
          </label>
        </div>
      )
      )}
    </fieldset>
  );
}

export default FilterByLevel;
