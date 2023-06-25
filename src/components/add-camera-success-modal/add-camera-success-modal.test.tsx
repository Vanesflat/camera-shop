import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import AddCameraSuccessModal from './add-camera-success-modal';

const mockStore = configureMockStore();
let isOpen = true;
const onClose = () => { isOpen = !isOpen; };

describe('Component: AddCameraSuccessModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddCameraSuccessModal isOpen={isOpen} onCloseCLick={onClose} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});
