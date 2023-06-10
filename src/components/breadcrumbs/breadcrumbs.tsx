import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import cn from 'classnames';

type BreadcrumbsProps = {
  path?: string;
};

function Breadcrumbs({ path }: BreadcrumbsProps): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link
              className={cn('breadcrumbs__link', !path && 'breadcrumbs__link--active')}
              to={AppRoute.Main}
              data-testid="breadcrumbs-link"
            >
              Каталог
              {path &&
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>}
            </Link>
          </li>
          {path &&
            <li className="breadcrumbs__item">
              <span className='breadcrumbs__link breadcrumbs__link--active'>{path}</span>
            </li>}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
