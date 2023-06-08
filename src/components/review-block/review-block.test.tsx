import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import ReviewBlock from './review-block';
import { NameSpace, Status } from '../../const';
import { makeFakeReview } from '../../utils/mocks';

const mockStore = configureMockStore();
const reviews = [makeFakeReview()];

describe('Component: ReviewBlock', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Reviews]: {
        reviews: reviews,
        status: Status.Idle
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewBlock />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });
});
