import { BasketItemType } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getBasketCameras } from '../../store/reducers/basket/selectors';
import BasketItem from '../basket-item/basket-item';
import BasketListEmpty from '../basket-list-empty/basket-list-empty';

function BasketList(): JSX.Element {
  const basketCameras = useAppSelector(getBasketCameras);

  return (
    <div className="basket__list">
      {!basketCameras.length
        ? <BasketListEmpty />
        : basketCameras.map((camera) => (
          <BasketItem
            camera={camera}
            type={BasketItemType.Standart}
            key={camera.id}
          />))}
    </div>
  );
}

export default BasketList;
