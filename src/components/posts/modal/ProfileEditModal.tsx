import ProfileEdit from '@/components/profile/ProfileEdit';
import ModalPortal from '@/components/ui/ModalPortal';
import { profileModalState } from '@/store/modal/homeModalAtoms';
import { homeResizeState } from '@/store/posts/postAtoms';
import { useRecoilValue } from 'recoil';

const ProfileEditModal = () => {
  const isProfileEditModalOpen = useRecoilValue(profileModalState);
  const isMobileSize = useRecoilValue(homeResizeState);

  return (
    <>
      {isProfileEditModalOpen && (
        <ModalPortal>
          <div
            onClick={e => e.stopPropagation()}
            className={`fixed  md:block ${
              isMobileSize
                ? 'flex flex-col w-full h-full top-0 left-0'
                : 'top-36 rounded-3xl  h-[480px] overflow-auto'
            } left-1/2  -translate-x-1/2 z-40 text-black bg-white dark:bg-dark dark:text-white w-[580px] `}
          >
            <ProfileEdit />
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default ProfileEditModal;
