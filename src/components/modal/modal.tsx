import { FocusTrap } from '@mui/base';
import cn from 'classnames';
import { useCallback, useEffect, useRef } from 'react';

type ModalProps = {
  isOpen: boolean;
  onCloseClick: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, onCloseClick, children }: ModalProps): JSX.Element {
  const modalRef = useRef(null);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onCloseClick();
    }
  }, [onCloseClick]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKeydown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKeydown);
    };
  }, [isOpen, handleEscapeKeydown]);

  return (
    <FocusTrap open={isOpen}>
      <div
        className={cn('modal', isOpen && 'is-active')}
        ref={modalRef}
        tabIndex={-1}
        data-testid="modal"
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseClick}></div>
          <div className="modal__content">
            {children}
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={onCloseClick}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default Modal;
