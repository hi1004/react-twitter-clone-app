import { homeModalState } from '@/store/modal/homeModalAtoms';
import { User } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';

interface HeaderProfileProps {
  user: User | null;
  toProfile?: boolean;
}

const HeaderProfile = ({ user, toProfile = false }: HeaderProfileProps) => {
  const setIsModalOpen = useSetRecoilState(homeModalState);
  const navigate = useNavigate();
  const location = useLocation();
  const openModal = () => {
    if (!toProfile) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {user && (
        <>
          <div
            onClick={e => {
              e.stopPropagation();
              if (location.pathname !== '/profile') {
                toProfile && navigate('/profile');
              }
            }}
            className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full cursor-pointer"
          >
            {user?.photoURL ? (
              <img
                onClick={openModal}
                src={user?.photoURL}
                alt={user?.displayName || undefined}
              />
            ) : (
              <div
                onClick={openModal}
                className="flex items-center justify-center w-10 h-10 overflow-hidden bg-white rounded-full cursor-pointer"
              >
                <FaUserCircle
                  size={42}
                  className="flex items-center justify-center text-primary"
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
