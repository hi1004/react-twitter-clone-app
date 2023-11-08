import { User } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';

interface HeaderProfileProps {
  user: User | null;
}

const HeaderProfile = ({ user }: HeaderProfileProps) => {
  return (
    <>
      {user && (
        <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full cursor-pointer md:hidden">
          {user?.photoURL ? (
            <img src={user?.photoURL} alt={user?.displayName || undefined} />
          ) : (
            <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white rounded-full cursor-pointer">
              <FaUserCircle
                size={40}
                className="flex items-center justify-center text-primary"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HeaderProfile;
