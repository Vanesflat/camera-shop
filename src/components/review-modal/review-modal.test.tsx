import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import ReviewModal from './review-modal';

const mockStore = configureMockStore();
let isOpen = true;
const onClose = () => { isOpen = !isOpen; };

describe('Component: ReviewModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewModal isOpen={isOpen} onCloseClick={onClose} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });
});
