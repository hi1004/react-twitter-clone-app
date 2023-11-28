import { NotificationsProps } from '@/components/notifications/Notifications';
import { homeModalState } from '@/store/modal/homeModalAtoms';
import { PostProps } from '@/store/posts/postAtoms';
import { User } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';

interface HeaderProfileProps {
  user: User | PostProps | null | NotificationsProps;
  toProfile?: boolean;
  profilePath?: boolean;
  overlay?: boolean;
  src?: string | null;
  toProfileSrc?: string;
}

const HeaderProfile = ({
  user,
  toProfile = false,
  profilePath,
  src,
  toProfileSrc,
  overlay,
}: HeaderProfileProps) => {
  const setIsModalOpen = useSetRecoilState(homeModalState);
  const navigate = useNavigate();
  const location = useLocation();
  const openModal = () => {
    if (!toProfile) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };
  return (
    <>
      {user && (
        <>
          <div
            onClick={e => {
              e.stopPropagation();
              if (
                !toProfileSrc &&
                location.pathname !== `/profile/${user.uid}`
              ) {
                toProfile && navigate(`/profile/${user.uid}`);
              }
              if (toProfileSrc) {
                toProfile && navigate(`/profile/${toProfileSrc}`);
              }
            }}
            className={`${overlay && 'w-28 h-28'}  ${
              profilePath &&
              'w-32 h-32 border-4 dark:border-slate-700 border-slate-200'
            } flex items-center justify-center w-10 h-10 overflow-hidden  rounded-full cursor-pointer`}
          >
            {user?.photoURL ? (
              <img
                className={`w-full h-full ${overlay && 'w-28 h-28'} ${
                  profilePath && 'w-32 h-32'
                }`}
                onClick={openModal}
                src={src ? src : user?.photoURL}
                alt={user?.displayName || undefined}
              />
            ) : (
              <div
                onClick={openModal}
                className={`${
                  profilePath &&
                  'w-32 h-32 dark:border-slate-700 border-slate-200'
                } flex items-center justify-center w-full h-full overflow-hidden bg-white rounded-full cursor-pointer`}
              >
                <FaUserCircle
                  size={42}
                  className={`${
                    profilePath && 'w-32 h-32'
                  } flex items-center justify-center text-primary`}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default HeaderProfile;
