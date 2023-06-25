import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera } from '../../utils/mocks';
import BasketRemoveCameraModal from './basket-remove-camera-modal';

const mockStore = configureMockStore();
const camera = makeFakeCamera();
let isOpen = true;
const onClose = () => { isOpen = !isOpen; };

describe('Component: BasketRemoveCameraModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketRemoveCameraModal
            camera={camera}
            isOpen={isOpen}
            onCloseCLick={onClose}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });
});
