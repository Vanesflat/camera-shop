import BasketList from '../../components/basket-list/basket-list';
import BasketOrderSuccessModal from '../../components/basket-order-success-modal/basket-order-success-modal';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getOrderStatus } from '../../store/reducers/basket/selectors';
import ErrorPage from '../error-page/error-page';

function BasketPage(): JSX.Element {
  const orderStatus = useAppSelector(getOrderStatus);

  if (orderStatus.isError) {
    return <ErrorPage />;
  }

  return (
    <Layout pageTitle="Корзина">
      <main data-testid="basket-page">
        <div className="page-content">
          <Breadcrumbs path="Корзина" />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList />
              <BasketSummary />
            </div>
          </section>
        </div>
        <BasketOrderSuccessModal />
      </main>
    </Layout>
  );
}

export default BasketPage;
