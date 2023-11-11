import { app } from '@/firebaseApp';
import { getAuth, signOut } from '@firebase/auth';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  return (
    <div>
      porifle
      <div
        onClick={async () => {
          const auth = getAuth(app);
          await signOut(auth);
          toast.success('logout');
        }}
      >
        logOut
      </div>
    </div>
  );
};

export default ProfilePage;
