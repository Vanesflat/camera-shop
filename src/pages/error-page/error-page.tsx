import { Link } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { resetOrderStatus } from '../../store/reducers/basket/basket';
import classes from './error-page.module.scss';

function ErrorPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetOrderStatus());
  };

  return (
    <Layout pageTitle="404. Ничего не найдено">
      <main data-testid="not-found-page">
        <div className={classes.wrapper}>
          <div className={classes.box}>
            <p className={classes.status}>🙁</p>
            <p className={classes.text}>При оформлении вашего заказа возникла ошибка</p>
            <Link
              className={classes.link}
              to={AppRoute.Main}
              onClick={handleClick}
            >
              Продолжить покупки
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default ErrorPage;
