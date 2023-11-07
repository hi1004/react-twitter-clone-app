import { ReactNode, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isSubmitted: boolean;
}

const Modal = ({ isOpen, onClose, children, isSubmitted }: ModalProps) => {
  useEffect(() => {
    if (isSubmitted) onClose();
  }, [isSubmitted]);
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-full h-[100vh] md:w-[500px]  flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-70"></div>
          <div className="relative z-10 flex w-full h-full p-8 bg-white rounded-none dark:bg-black md:rounded-lg md:h-auto ">
            <button
              onClick={onClose}
              className="absolute text-gray-500 pointerhover:hover:text-gray-700 dark:text-slate-400 pointerhover:hover:dark:text-slate-100 top-10 md:right-6"
            >
              <CgClose size={28} />
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
