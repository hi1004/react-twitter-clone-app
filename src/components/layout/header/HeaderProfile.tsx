import { homeModalState } from '@/store/Nav/homeModalAtoms';
import { User } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';

interface HeaderProfileProps {
  user: User | null;
  toProfile?: boolean;
}

const HeaderProfile = ({ user, toProfile = false }: HeaderProfileProps) => {
  const setIsModalOpen = useSetRecoilState(homeModalState);
  const openModal = () => {
    if (!toProfile) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {user && (
        <>
          <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full cursor-pointer">
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
