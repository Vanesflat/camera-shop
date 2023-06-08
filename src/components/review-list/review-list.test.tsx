import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeReview } from '../../utils/mocks';
import ReviewList from './review-list';

const mockStore = configureMockStore();
const reviews = [makeFakeReview()];

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewList reviews={reviews} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('review-list')).toBeInTheDocument();
  });
});
