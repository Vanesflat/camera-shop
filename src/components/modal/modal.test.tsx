import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Modal from './modal';

const mockStore = configureMockStore();
let isOpen = true;
const onClose = () => { isOpen = !isOpen; };

describe('Component: Modal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Modal isOpen={isOpen} onCloseClick={onClose}>
            <h1>modal</h1>
          </Modal>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
