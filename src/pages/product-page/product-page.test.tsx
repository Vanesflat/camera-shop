import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, Status } from '../../const';
import { makeFakeCamera } from '../../utils/mocks';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import ProductPage from './product-page';

const mockStore = configureMockStore([thunk]);

const camera = makeFakeCamera();
const cameras = [makeFakeCamera()];

describe('Page: ProductPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Camera]: {
        camera: camera,
        status: Status.Success
      },
      [NameSpace.Cameras]: {
        cameras: cameras,
        status: Status.Success
      },
      [NameSpace.Reviews]: {
        reviews: [],
        status: Status.Success
      },
      [NameSpace.SimilarCameras]: {
        similarCameras: [],
        status: Status.Success
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });
});
