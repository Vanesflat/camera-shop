import { Camera } from '../../types/camera';
import BasketItem from '../basket-item/basket-item';
import BasketListEmpty from '../basket-list-empty/basket-list-empty';

type BasketListProps = {
  cameras: Camera[];
  isBasketPage?: boolean;
}

function BasketList({ cameras, isBasketPage = true }: BasketListProps): JSX.Element {
  return (
    <div className="basket__list">
      {!cameras.length ?
        <BasketListEmpty /> :
        cameras.map((camera) => <BasketItem camera={camera} isBasketPage={isBasketPage} key={camera.id} />)}
    </div>
  );
}

export default BasketList;
