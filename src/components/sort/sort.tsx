import { URLSearchParams } from 'url';
import SortByOrder from '../sort-by-order/sort-by-order';
import SortByType from '../sort-by-type/sort-by-type';

type SortProps = {
  currentPage: number;
  searchParams: URLSearchParams;
};

function Sort({ currentPage, searchParams }: SortProps): JSX.Element {
  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <SortByType currentPage={currentPage} searchParams={searchParams} />
          <SortByOrder currentPage={currentPage} searchParams={searchParams} />
        </div>
      </form>
    </div>
  );
}

export default Sort;
