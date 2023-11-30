import HeaderProfile from '@/components/layout/header/HeaderProfile';
import { NotificationsProps } from '@/components/notifications/Notifications';
import { db } from '@/firebaseApp';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface NotificationListItemProps {
  notification: NotificationsProps;
}

const NotificationListItem = ({ notification }: NotificationListItemProps) => {
  const navigate = useNavigate();
  const handleClickNotification = async (url: string) => {
    const ref = doc(db, 'notifications', notification.id);
    await updateDoc(ref, {
      isRead: true,
    });
    navigate(url);
  };
  const getFormattedTime = (createdAt: string) => {
    const currentDate = new Date();
    const postDate = new Date(createdAt);

    const timeDifference = currentDate.getTime() - postDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    if (minutesDifference === 0) {
      return '現在';
    }
    if (minutesDifference < 60) {
      return `${minutesDifference}分前`;
    }
    if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference}時間前`;
    }
    return postDate.toLocaleString('ja-JP', {
      month: 'long',
      day: 'numeric',
    });
  };
  const formattedTime =
    notification?.createdAt && getFormattedTime(notification?.createdAt);
  return (
    <>
      {notification?.likeContent ? (
        <li
          className="px-4 py-5 border-b cursor-pointer dark:pointerhover:hover:bg-gray-800 pointerhover:hover:bg-gray-200 dark:border-b-slate-600 border-b-slate-300"
          onClick={() => handleClickNotification(notification?.url)}
        >
          <div className="relative flex items-start justify-between">
            <div className="flex items-start gap-4">
              <HeaderProfile
                user={notification}
                src={notification?.photoURL}
                toProfileSrc={notification?.toProfile}
                toProfile
              />
              <div className="font-bold"> {notification?.displayName}</div>
            </div>
            <div className="text-sm text-slate-400">{formattedTime}</div>
            {notification?.isRead === false && (
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-primary" />
            )}
          </div>

          <p className="text-sm pl-14 text-slate-400">
            {notification?.likeContent}
          </p>
        </li>
      ) : (
        <></>
      )}
      {notification?.content && (
        <li
          className="px-4 py-5 border-b cursor-pointer dark:pointerhover:hover:bg-gray-800 pointerhover:hover:bg-gray-200 dark:border-b-slate-600 border-b-slate-300"
          onClick={() => handleClickNotification(notification?.url)}
        >
          <div className="relative flex items-start justify-between">
            <div className="flex items-start gap-4">
              <HeaderProfile
                user={notification}
                src={notification?.photoURL}
                toProfileSrc={notification?.toProfile}
                toProfile
              />
              <div className="font-bold"> {notification?.displayName}</div>
            </div>
            <div className="text-sm text-slate-400">{formattedTime}</div>
            {notification?.isRead === false && (
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-primary" />
            )}
          </div>

          <p className="text-sm pl-14 text-slate-400">
            {notification?.content}
          </p>
        </li>
      )}
    </>
  );
};

export default NotificationListItem;
