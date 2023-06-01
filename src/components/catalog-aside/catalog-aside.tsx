import FilterForm from '../filter-form/filter-form';

function CatalogAside(): JSX.Element {
  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <FilterForm />
      </div>
    </div>
  );
}

export default CatalogAside;
