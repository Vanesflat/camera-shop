import BasketList from '../../components/basket-list/basket-list';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Layout from '../../components/layout/layout';

function BasketPage(): JSX.Element {
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
      </main>
    </Layout>
  );
}

export default BasketPage;
