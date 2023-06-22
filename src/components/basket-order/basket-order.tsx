function BasketOrder(): JSX.Element {
  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
      <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
      <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
      <button className="btn btn--purple" type="submit">Оформить заказ</button>
    </div>
  );
}

export default BasketOrder;
