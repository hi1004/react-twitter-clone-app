import { ReactNode, createContext, useEffect, useState } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';

const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  loading: false,
});

interface ModalProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => {
      if (location.pathname === '/signup' && window.innerWidth < 768) {
        setIsModalOpen(false);
      } else if (location.pathname === '/signup' && window.innerWidth >= 768) {
        setLoading(true);
        setTimeout(() => {
          navigate('/login');
          setIsModalOpen(true);
          setLoading(false);
        }, 400);
      } else if (
        location.pathname === '/login' &&
        isModalOpen &&
        window.innerWidth < 768
      ) {
        setLoading(true);
        setTimeout(() => {
          navigate('/signup');
          setIsModalOpen(false);
          setLoading(false);
        }, 400);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname, navigate, isModalOpen, loading]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, loading, closeModal }}
    >
      {loading ? (
        <RiTwitterXLine
          size={40}
          className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
        />
      ) : (
        children
      )}
    </ModalContext.Provider>
  );
};

export default ModalContext;
