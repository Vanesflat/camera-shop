import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { NameSpace, Status } from '../../const';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import SimilarProducts from './similar-products';
import { makeFakeCamera } from '../../utils/mocks';

const mockStore = configureMockStore();
const similarCameras = [makeFakeCamera()];

describe('Component: SimilarProducts', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.SimilarCameras]: {
        similarCameras: similarCameras,
        status: Status.Idle
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarProducts />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});
