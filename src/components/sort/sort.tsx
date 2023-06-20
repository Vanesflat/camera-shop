import SortByOrder from '../sort-by-order/sort-by-order';
import SortByType from '../sort-by-type/sort-by-type';

function Sort(): JSX.Element {
  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <SortByType />
          <SortByOrder />
        </div>
      </form>
    </div>
  );
}

export default Sort;
