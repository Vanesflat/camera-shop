import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import ReviewForm from './review-form';

const mockStore = configureMockStore();
let isOpen = true;
const onClose = () => { isOpen = !isOpen; };

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm isOpen={isOpen} onClose={onClose} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });
});
