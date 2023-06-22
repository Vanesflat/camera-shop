import classes from './basket-list-empty.module.scss';

function BasketListEmpty(): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <p className={classes.text}>Корзина пуста</p>
    </div>
  );
}

export default BasketListEmpty;
