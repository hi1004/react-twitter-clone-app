import {
  deleteModalState,
  editModalState,
  imgModalState,
  postModalState,
  profileModalState,
} from '@/store/modal/homeModalAtoms';
import { tagState } from '@/store/posts/postAtoms';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useSetRecoilState } from 'recoil';

interface ModalPortalProps {
  children: ReactNode;
}

const ModalOverlay = ({ children }: ModalPortalProps) => {
  const setIsDeleteModalOpen = useSetRecoilState(deleteModalState);
  const setIsEditModalOpen = useSetRecoilState(editModalState);
  const setIsPostModalOpen = useSetRecoilState(postModalState);
  const setIsProfileModalOpen = useSetRecoilState(profileModalState);

  const setIsHidden = useSetRecoilState(imgModalState);

  const setTags = useSetRecoilState(tagState);
  const handleOverlayClick = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setIsPostModalOpen(false);
    setIsProfileModalOpen(false);
    setIsHidden(false);
    setTags([]);
  };

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 z-30 w-full h-full bg-gray-700 bg-opacity-40"
      onClick={handleOverlayClick}
    >
      {children}
    </div>,
    document.getElementById('modal-overlay')!
  );
};

const ModalPortal = ({ children }: ModalPortalProps) => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay>
        <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full">
          {children}
        </div>
      </ModalOverlay>
    </>,
    document.getElementById('modal')!
  );
};

export default ModalPortal;
