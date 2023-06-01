import { Level } from '../../const';

function FilterByLevel(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {Object.values(Level).map((level) => (
        <div className="custom-checkbox catalog-filter__item" key={level}>
          <label>
            <input type="checkbox" name="zero" />
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
