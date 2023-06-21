import { ChangeEvent, Fragment, useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormField, ReviewFormFields } from '../../types/form';
import { ReviewData } from '../../types/review-data';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { sendReviewAction } from '../../store/reducers/reviews/api-actions';
import { RATING_TITLES } from './const';

type ReviewFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormFieldKey = keyof ReviewFormFields;

const reviewFields: Record<FormFieldKey, FormField> = {
  name: {
    label: 'Ваше имя',
    placeholder: 'Введите ваше имя',
    errorText: 'Нужно указать имя'
  },
  plus: {
    label: 'Достоинства',
    placeholder: 'Основные преимущества товара',
    errorText: 'Нужно указать достоинства'
  },
  minus: {
    label: 'Недостатки',
    placeholder: 'Главные недостатки товара',
    errorText: 'Нужно указать недостатки'
  },
  comment: {
    label: 'Комментарий',
    placeholder: 'Поделитесь своим опытом покупки',
    errorText: 'Нужно добавить комментарий',
    minLength: 5
  }
};

const reviewFieldKeys = Object.keys(reviewFields) as FormFieldKey[];

function ReviewForm({ isOpen, onClose }: ReviewFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitted
    },
    reset
  } = useForm<ReviewFormFields>({
    mode: 'onChange'
  });

  const cameraId = Number(useParams().id);
  const [rating, setRating] = useState(0);

  const dispatch = useAppDispatch();

  const resetForm = useCallback(() => {
    reset();
    setRating(0);
  }, [reset]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [resetForm, isOpen]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value } = evt.target;

    setRating(+value);
  };

  const onSubmit: SubmitHandler<ReviewFormFields> = (data) => {
    const reviewData: ReviewData = {
      cameraId: cameraId,
      userName: data.name,
      advantage: data.plus,
      disadvantage: data.minus,
      rating: rating,
      review: data.comment
    };

    dispatch(sendReviewAction(reviewData));
    onClose();
    resetForm();
  };

  return (
    <div className="form-review" data-testid="review-form">
      <form
        method="post"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-review__rate">
          <fieldset className={cn('rate form-review__item', (!rating && isSubmitted) && 'is-invalid')}>
            <legend className="rate__caption">Рейтинг
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </legend>
            <div className="rate__bar">
              <div className="rate__group">
                {RATING_TITLES.map((rate, i) => {
                  const reversedIndex = RATING_TITLES.length - i;

                  return (
                    <Fragment key={rate}>
                      <input
                        className="visually-hidden"
                        id={`star-${reversedIndex}`}
                        name="rate"
                        type="radio"
                        value={reversedIndex}
                        checked={rating === reversedIndex}
                        onChange={handleChange}
                      />
                      <label className="rate__label" htmlFor={`star-${reversedIndex}`} title={rate}></label>
                    </Fragment>
                  );
                })}
              </div>
              <div className="rate__progress">
                <span className="rate__stars">{rating}</span>
                <span>/</span>
                <span className="rate__all-stars">{RATING_TITLES.length}</span>
              </div>
            </div>
            <p className="rate__message">Нужно оценить товар</p>
          </fieldset>
          {reviewFieldKeys.map((key: FormFieldKey) => {
            const { label, placeholder, errorText, minLength } = reviewFields[key];

            return (
              <div className={cn(`${key === 'comment' ? 'custom-textarea' : 'custom-input'} form-review__item`, errors[key] && 'is-invalid')} key={key}>
                <label>
                  <span className={key === 'comment' ? 'custom-textarea__label' : 'custom-input__label'}>{label}
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  {key !== 'comment' ?
                    <input
                      {...register(`${key}`, {
                        required: errorText
                      })}
                      type="text"
                      name={key}
                      placeholder={placeholder}
                    /> :
                    <textarea
                      {...register(`${key}`, {
                        required: errorText,
                        minLength: {
                          value: minLength as number,
                          message: `Минимум ${minLength as number} символов`
                        }
                      })}
                      name={key}
                      placeholder={placeholder}
                    >
                    </textarea>}
                </label>
                <p className={key === 'comment' ? 'custom-textarea__error' : 'custom-input__error'}>{errors[key]?.message}</p>
              </div>
            );
          })}
        </div>
        <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
      </form>
    </div>
  );
}

export default ReviewForm;
