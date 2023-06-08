import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera } from '../../utils/mocks';
import ProductCardsList from './product-cards-list';

const mockStore = configureMockStore();
const cameras = [makeFakeCamera()];

describe('Component: ProductCardsList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCardsList cameras={cameras} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('product-cards-list')).toBeInTheDocument();
  });
});
