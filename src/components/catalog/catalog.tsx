import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getfilteredCameras } from '../../store/reducers/cameras/selectors';
import CamerasEmpty from '../cameras-empty/cameras-empty';
import Pagination from '../pagination/pagination';
import ProductCardsList from '../product-cards-list/product-cards-list';
import Sort from '../sort/sort';

const CAMERAS_PER_PAGE = 9;

function Catalog(): JSX.Element {
  const cameras = useAppSelector(getfilteredCameras);

  const param = useParams().page;
  let currentPage = Number(param?.replace(/[^\d]/g, ''));

  if (!currentPage) {
    currentPage = 1;
  }
  const pageCount = Math.ceil(cameras.length / CAMERAS_PER_PAGE);

  const renderedCameras = cameras.slice((currentPage - 1) * CAMERAS_PER_PAGE, currentPage * CAMERAS_PER_PAGE);

  return (
    <div className="catalog__content">
      <Sort />
      {!renderedCameras.length
        ? <CamerasEmpty />
        : <ProductCardsList cameras={renderedCameras} />}
      {pageCount > 1 && <Pagination currentPage={currentPage} pageCount={pageCount} />}
    </div>
  );
}

export default Catalog;
