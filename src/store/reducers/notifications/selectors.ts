import { NameSpace } from '../../../const';
import { Notification } from '../../../types/notification';
import { State } from '../../../types/store';

export const getNotifications = (state: State): Notification[] => state[NameSpace.Notification].notifications;
