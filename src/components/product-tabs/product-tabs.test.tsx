import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera } from '../../utils/mocks';
import ProductTabs from './product-tabs';

const mockStore = configureMockStore();
const camera = makeFakeCamera();

describe('Component: ProductTabs', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductTabs camera={camera} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('product-tabs')).toBeInTheDocument();
  });
});
