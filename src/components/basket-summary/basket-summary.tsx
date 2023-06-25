import BasketPromo from '../basket-promo/basket-promo';
import BasketOrder from '../basket-order/basket-order';

function BasketSummary(): JSX.Element {
  return (
    <div className="basket__summary" data-testid="basket-summary">
      <BasketPromo />
      <BasketOrder />
    </div>
  );
}

export default BasketSummary;
