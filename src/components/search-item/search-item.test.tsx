/* eslint-disable no-console */
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import SearchItem from './search-item';
import { makeFakeCamera } from '../../utils/mocks';

const mockStore = configureMockStore();
const camera = makeFakeCamera();

describe('Component: SearchItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SearchItem camera={camera} isCurrent onClick={() => { console.log('hello'); }} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('search-item')).toBeInTheDocument();
  });
});
