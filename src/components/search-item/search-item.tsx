import cn from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Camera } from '../../types/camera';
import classes from './search-item.module.scss';

type SearchItemProps = {
  camera: Camera;
  isCurrent: boolean;
  onClick: (cameraId: number) => void;
};

function SearchItem({ camera, isCurrent, onClick }: SearchItemProps): JSX.Element {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isCurrent) {
      itemRef.current?.focus();
    }
  }, [isCurrent]);

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    evt.preventDefault();

    if (evt.key === 'Enter') {
      onClick(camera.id);
    }
  };

  return (
    <li
      className={cn('form-search__select-item', isCurrent && classes.active)}
      tabIndex={isCurrent ? -1 : 0}
      key={camera.id}
      ref={itemRef}
      onClick={() => onClick(camera.id)}
      onKeyDown={handleKeyDown}
    >
      {camera.name}
    </li>
  );
}

export default SearchItem;
