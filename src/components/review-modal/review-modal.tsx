import Modal from '../modal/modal';
import ReviewForm from '../review-form/review-form';

type ReviewModalProps = {
  isOpen: boolean;
  onCloseClick: () => void;
};

function ReviewModal({ isOpen, onCloseClick }: ReviewModalProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onCloseClick={onCloseClick}>
      <p className="title title--h4">Оставить отзыв</p>
      <ReviewForm isOpen={isOpen} onClose={onCloseClick} />
    </Modal>
  );
}

export default ReviewModal;
