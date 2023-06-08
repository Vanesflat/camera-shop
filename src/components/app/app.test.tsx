import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, NameSpace, Status } from '../../const';
import App from './app';
import HistoryRouter from '../history-router/history-router';
import { createAPI } from '../../services/api';
import { State } from '../../types/store';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../utils/mocks';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const camera = makeFakeCamera();
const cameras = [makeFakeCamera()];
const similarCameras = [makeFakeCamera()];
const promo = makeFakePromo();
const reviews = [makeFakeReview()];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  [NameSpace.Camera]: {
    camera: camera,
    status: Status.Success
  },
  [NameSpace.Cameras]: {
    cameras: cameras,
    status: Status.Success
  },
  [NameSpace.Promo]: {
    promo: promo,
    status: Status.Success
  },
  [NameSpace.Reviews]: {
    reviews: reviews,
    status: Status.Success,
    postStatus: Status.Success
  },
  [NameSpace.SimilarCameras]: {
    similarCameras: similarCameras,
    status: Status.Success
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
});
