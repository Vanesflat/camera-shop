import { useState } from 'react';
import { Camera } from '../../types/camera';
import cn from 'classnames';

type ProductTabsProps = {
  camera: Camera;
};

function ProductTabs({ camera }: ProductTabsProps): JSX.Element {
  const [openedFeatures, setOpenedFeatures] = useState(false);
  const [openedDescription, setOpenedDescription] = useState(true);

  const handleClick = () => {
    setOpenedDescription(!openedDescription);
    setOpenedFeatures(!openedFeatures);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button className={cn('tabs__control', openedFeatures && 'is-active')} type="button" onClick={handleClick}>Характеристики</button>
        <button className={cn('tabs__control', openedDescription && 'is-active')} type="button" onClick={handleClick}>Описание</button>
      </div>
      <div className="tabs__content">
        <div className={cn('tabs__element', openedFeatures && 'is-active')}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{camera.vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{camera.category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{camera.type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{camera.level}</p>
            </li>
          </ul>
        </div>
        <div className={cn('tabs__element', openedDescription && 'is-active')}>
          <div className="product__tabs-text">
            <p>{camera.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
