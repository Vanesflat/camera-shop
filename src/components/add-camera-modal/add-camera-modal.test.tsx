import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import AddCameraModal from './add-camera-modal';
import { makeFakeCamera } from '../../utils/mocks';

const mockStore = configureMockStore();
const camera = makeFakeCamera();
let isOpen = true;
const onClose = () => { isOpen = !isOpen; };

describe('Component: AddCameraModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddCameraModal
            camera={camera}
            isOpen={isOpen}
            onCloseCLick={onClose}
            setOpenedAddSuccessModal={() => { String(isOpen); }}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});
