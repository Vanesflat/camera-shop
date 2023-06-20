import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import NotificationCard from './components/notification-card/notification-card';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <HistoryRouter history={browserHistory}>
      <ToastContainer theme='dark' />
      <NotificationCard />
      <App />
    </HistoryRouter>
  </Provider>
);
