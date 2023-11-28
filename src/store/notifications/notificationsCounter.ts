import { NotificationsProps } from '@/components/notifications/Notifications';
import { atom } from 'recoil';

export const notificationState = atom<NotificationsProps[]>({
  key: 'notificationState',
  default: [],
});
export const notificationReadState = atom<number>({
  key: 'notificationReadState',
  default: 0,
});
