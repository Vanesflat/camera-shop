import { generatePath, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function MainPage(): JSX.Element {
  return (
    <Navigate to={generatePath(AppRoute.Catalog, { page: 'page_1' })} />
  );
}

export default MainPage;
