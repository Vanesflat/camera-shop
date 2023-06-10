import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoProps = {
  type: 'header' | 'footer';
}

function Logo({ type }: LogoProps): JSX.Element {
  return (
    <Link
      className={`${type}__logo`}
      to={AppRoute.Main}
      aria-label="Переход на главную"
      data-testid="logo"
    >
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={type === 'header' ? '#icon-logo' : '#icon-logo-mono'}></use>
      </svg>
    </Link>
  );
}

export default Logo;
