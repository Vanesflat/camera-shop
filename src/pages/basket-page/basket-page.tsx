import BasketList from '../../components/basket-list/basket-list';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCameras } from '../../store/reducers/cameras/selectors';

function BasketPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  return (
    <Layout pageTitle="Корзина">
      <main data-testid="basket-page">
        <div className="page-content">
          <Breadcrumbs path="Корзина" />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList cameras={cameras.slice(0, 6)} />
              <BasketSummary />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default BasketPage;
