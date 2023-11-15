import { deleteModalState } from '@/store/modal/homeModalAtoms';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useSetRecoilState } from 'recoil';

interface ModalPortalProps {
  children: ReactNode;
}

const ModalOverlay = ({ children }: ModalPortalProps) => {
  const setIsDeleteModalOpen = useSetRecoilState(deleteModalState);

  const handleOverlayClick = () => {
    setIsDeleteModalOpen(false);
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
