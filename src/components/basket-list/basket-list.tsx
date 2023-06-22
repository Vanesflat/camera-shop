import { Camera } from '../../types/camera';
import BasketItem from '../basket-item/basket-item';

type BasketListProps = {
  cameras: Camera[];
}

function BasketList({ cameras }: BasketListProps): JSX.Element {
  return (
    <div className="basket__list">
      {cameras.map((camera) => <BasketItem camera={camera} key={camera.id} />)}
    </div>
  );
}

export default BasketList;
