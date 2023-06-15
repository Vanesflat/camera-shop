import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import BasketBtn from '../basket-btn/basket-btn';
import Logo from '../logo/logo';
import SearchForm from '../search-form/search-form';

function Header(): JSX.Element {
  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Logo type="header" />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Main}>Каталог</Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/#">Гарантии</a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/#">Доставка</a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/#">О компании</a>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <BasketBtn />
      </div>
    </header>
  );
}

export default Header;
