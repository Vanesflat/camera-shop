import { Type } from '../../const';

function FilterByType(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {Object.values(Type).map((type) => (
        <div className="custom-checkbox catalog-filter__item" key={type}>
          <label>
            <input type="checkbox" name="digital" />
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
