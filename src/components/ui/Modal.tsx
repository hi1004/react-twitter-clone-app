import { ReactNode, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isSubmitted: boolean;
  step: number;
  handleStepSubmit: (n: number) => void;
}

const Modal = ({ isOpen, onClose, children, isSubmitted }: ModalProps) => {
  useEffect(() => {
    if (isSubmitted) onClose();
  }, [isSubmitted]);
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-[500px]">
          <div className="fixed inset-0 bg-black opacity-70"></div>
          <div className="relative z-10 p-8 bg-white rounded-lg">
            <button
              onClick={onClose}
              className="absolute text-gray-500 top-8 right-6"
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
