import { Status } from '../../../const';
import { makeFakePromo } from '../../../utils/mocks';
import { fetchPromoAction } from './api-actions';
import { promoSlice, PromoSlice } from './promo';

const promo = makeFakePromo();

describe('Reducer: promoSlice', () => {
  let state: PromoSlice;

  beforeEach(() => {
    state = {
      promo: null,
      status: Status.Idle
    };
  });
  it('Should return initial state without additional parameters', () => {
    expect(promoSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchPromoAction test', () => {
    it('Should update status to "LOADING" if fetchPromoAction pending', () => {
      expect(promoSlice.reducer(state, { type: fetchPromoAction.pending.type }))
        .toEqual({
          ...state,
          status: Status.Loading
        });
    });

    it('Should load promo and update status to "SUCCESS" if fetchPromoAction fulfilled', () => {
      expect(promoSlice.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: promo }))
        .toEqual({
          ...state,
          promo: promo,
          status: Status.Success
        });
    });

    it('Should update status to "ERROR" is fetchPromoAction rejected', () => {
      expect(promoSlice.reducer(state, { type: fetchPromoAction.rejected.type }))
        .toEqual({
          ...state,
          status: Status.Error
        });
    });
  });
});
