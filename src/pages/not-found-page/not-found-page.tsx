import { Link } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { AppRoute } from '../../const';
import classes from './not-found-page.module.scss';

function NotFoundPage(): JSX.Element {
  return (
    <Layout pageTitle="404. Ничего не найдено">
      <main>
        <div className={classes.wrapper}>
          <div className={classes.box}>
            <p className={classes.status}>404</p>
            <p className={classes.text}>Страница не найдена</p>
            <Link className={classes.link} to={AppRoute.Main}>Перейти на <span>главную</span></Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default NotFoundPage;
