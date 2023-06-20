import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { clearNotification } from '../../store/reducers/notifications/notifications';
import { getNotifications } from '../../store/reducers/notifications/selectors';
import { Notification } from '../../types/notification';

function NotificationCard(): JSX.Element {
  const notifications = useAppSelector(getNotifications);
  const dispatch = useAppDispatch();

  const renderNotification = () => {
    notifications.forEach((notification: Notification) => {
      const toastOptions = {
        autoClose: notification.duration,
        toastId: notification.id,
        onClose: () => dispatch(clearNotification(notification.id)),
      };

      if (toast.isActive(notification.id)) {
        return;
      }

      switch (notification.type) {
        case 'error':
          toast.error(notification.message, toastOptions);
          break;
        case 'success':
          toast.success(notification.message, toastOptions);
          break;
        case 'info':
          toast.info(notification.message, toastOptions);
          break;
        case 'warning':
          toast.warning(notification.message, toastOptions);
          break;
        default:
          return null;
      }
    });
  };

  return (
    <>
      {renderNotification()}
    </>
  );
}

export default NotificationCard;
