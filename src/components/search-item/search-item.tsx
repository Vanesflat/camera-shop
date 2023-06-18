import { useEffect, useRef } from 'react';
import { Camera } from '../../types/camera';

type SearchItemProps = {
  camera: Camera;
  isCurrent: boolean;
};

function SearchItem({ camera, isCurrent }: SearchItemProps): JSX.Element {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isCurrent) {
      itemRef.current?.focus();
    }
  }, [isCurrent]);

  return (
    <li
      className="form-search__select-item"
      tabIndex={isCurrent ? -1 : 0}
      key={camera.id}
      ref={itemRef}
    >
      {camera.name}
    </li>
  );
}

export default SearchItem;
