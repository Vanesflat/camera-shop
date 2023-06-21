import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { NameSpace, Status } from '../../const';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import ReviewSuccessModal from './review-success-modal';

const mockStore = configureMockStore();

describe('Component: ReviewSuccessModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Reviews]: {
        reviews: [],
        status: Status.Idle
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSuccessModal />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });
});
