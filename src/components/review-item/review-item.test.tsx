import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import ReviewItem from './review-item';
import { makeFakeReview } from '../../utils/mocks';

const mockStore = configureMockStore();
const review = makeFakeReview();

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewItem review={review} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('review-item')).toBeInTheDocument();
  });
});
