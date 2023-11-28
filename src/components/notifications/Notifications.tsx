import NotificationListItem from '@/components/notifications/NotificationListItem';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import {
  notificationReadState,
  notificationState,
} from '@/store/notifications/notificationsCounter';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

export interface NotificationsProps {
  id: string;
  uid: string;
  url: string;
  isRead: boolean;
  content: string;
  createdAt: string;
  photoURL: string;
  displayName: string;
  toProfile: string;
  likeContent?: string;
  likes?: boolean;
}

const Notifications = () => {
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const [notifications, setNotifications] = useRecoilState(notificationState);
  const setNotificationReadCount = useSetRecoilState(notificationReadState);

  useEffect(() => {
    if (user) {
      const ref = collection(db, 'notifications');
      const notificationQuery = query(
        ref,
        where('uid', '==', user?.uid),
        orderBy('createdAt', 'desc')
      );

      onSnapshot(notificationQuery, snapShot => {
        const dataObj = snapShot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotifications(dataObj as NotificationsProps[]);
      });
    }
  }, [user]);

  useEffect(() => {
    setNotificationReadCount(
      notifications.filter(notification => !notification?.isRead).length
    );
  });

  return (
    <div className={`w-full`}>
      <h3 className="p-4 text-2xl font-bold border-b dark:border-b-slate-600 border-b-slate-300">
        通知
      </h3>
      <ul>
        {notifications?.length > 0 ? (
          notifications.map(notification => (
            <NotificationListItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <div className="mt-10 font-bold text-center">
            通知がまだありません
          </div>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
