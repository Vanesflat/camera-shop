import FilterByCategory from '../filter-by-category/filter-by-category';
import FilterByLevel from '../filter-by-level/filter-by-level';
import FilterByPrice from '../filter-by-price/filter-by-price';
import FilterByType from '../filter-by-type/filter-by-type';

function FilterForm(): JSX.Element {
  return (
    <form action="#" data-testid="filter-form">
      <h2 className="visually-hidden">Фильтр</h2>
      <FilterByPrice />
      <FilterByCategory />
      <FilterByType />
      <FilterByLevel />
      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры</button>
    </form>
  );
}

export default FilterForm;
