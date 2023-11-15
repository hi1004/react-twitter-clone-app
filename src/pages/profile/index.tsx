import { app } from '@/firebaseApp';
import { homeModalState } from '@/store/modal/homeModalAtoms';
import { getAuth, signOut } from '@firebase/auth';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

const ProfilePage = () => {
  const setIsModalOpen = useSetRecoilState(homeModalState);

  return (
    <div>
      <div
        onClick={async () => {
          const auth = getAuth(app);
          await signOut(auth);
          setIsModalOpen(false);
          toast.success('logout');
        }}
      >
        logOut
      </div>
    </div>
  );
};

export default ProfilePage;
