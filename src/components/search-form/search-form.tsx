import cn from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, DEFAULT_PRODUCT_TAB } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import useKeyPress from '../../hooks/use-key-press/use-key-press';
import { useOnClickOutside } from '../../hooks/use-on-click-outside/use-on-click-outside';
import { getCameras } from '../../store/reducers/cameras/selectors';
import SearchItem from '../search-item/search-item';

const DISPLAYED_SEARCH_RESULT_COUNT = 4;

function SearchForm(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCameraIndex, setCurrentCameraIndex] = useState(-1);

  const navigate = useNavigate();

  const listRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upArrow = useKeyPress({ targetKey: 'ArrowUp' });
  const downArrow = useKeyPress({ targetKey: 'ArrowDown' });

  const cameras = useAppSelector(getCameras);
  const searchedCameras = useMemo(() =>
    cameras.filter((camera) =>
      camera.name.toLowerCase().includes(searchQuery.toLowerCase())), [cameras, searchQuery]);

  const isUpArrowPressed = searchQuery && searchedCameras.length && upArrow;
  const isDownArrowPressed = searchQuery && searchedCameras.length && downArrow;

  useOnClickOutside(listRef, () => setSearchQuery(''));

  useEffect(() => {
    if (searchedCameras.length && isUpArrowPressed) {
      setCurrentCameraIndex((prev) => (prev ? prev - 1 : prev));

      if (!currentCameraIndex) {
        inputRef.current?.focus();
        setCurrentCameraIndex(-1);
      }

    } else if (searchedCameras.length && isDownArrowPressed) {
      setCurrentCameraIndex((prev) => (prev < searchedCameras.length - 1 ? prev + 1 : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpArrowPressed, isDownArrowPressed, searchedCameras.length]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(evt.target.value);
  };

  const handleClick = () => {
    setSearchQuery('');
  };

  const onSearchItemClick = (cameraId: number) => {
    navigate(`${AppRoute.Product}/${String(cameraId)}?tab=${DEFAULT_PRODUCT_TAB}`);

    setSearchQuery('');
  };

  return (
    <div
      className={cn('form-search', searchedCameras.length && searchQuery && 'list-opened')}
      ref={listRef}
      tabIndex={-1}
    >
      <form onSubmit={(evt) => { evt.preventDefault(); }}>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchQuery}
            onChange={handleChange}
            ref={inputRef}
          />
        </label>
        <ul className={cn('form-search__select-list', searchedCameras.length > DISPLAYED_SEARCH_RESULT_COUNT && 'scroller')}>
          {searchedCameras.map((camera, i) => {
            const isCurrent = i === currentCameraIndex;

            return (
              <SearchItem
                camera={camera}
                isCurrent={isCurrent}
                key={camera.id}
                onClick={onSearchItemClick}
              />
            );
          }
          )}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;
