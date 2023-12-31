import { ReactNode, createContext, useEffect, useState } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';

const ModalContext = createContext({
  isModalOpen: false,
  isLoginModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  clickLoginButton: () => {},
  closeLoginPage: () => {},
  loading: false,
  login: false,
});

interface ModalProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const clickLoginButton = () => {
    setLogin(true);
    setIsLoginModalOpen(true);
  };
  const closeLoginPage = () => {
    setLogin(false);
    setIsLoginModalOpen(false);
  };

  if (!isLoginModalOpen) {
    useEffect(() => {
      const handleResize = () => {
        if (location.pathname === '/signup' && window.innerWidth < 768) {
          closeModal();
          setIsLoginModalOpen(false);
        } else if (
          location.pathname === '/signup' &&
          window.innerWidth >= 768
        ) {
          setLoading(true);
          setTimeout(() => {
            navigate('/');
            openModal();
            setLoading(false);
          }, 400);
        } else if (
          location.pathname === '/' &&
          isModalOpen &&
          window.innerWidth < 768
        ) {
          setLoading(true);
          setTimeout(() => {
            navigate('/signup');
            closeModal();
            setLoading(false);
          }, 400);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [
      location.pathname,
      navigate,
      closeModal,
      openModal,
      isModalOpen,
      loading,
    ]);
  } else {
    useEffect(() => {
      const handleResize = () => {
        if (location.pathname === '/signup' && window.innerWidth < 768) {
          closeLoginPage();
        } else if (
          location.pathname === '/signup' &&
          window.innerWidth >= 768
        ) {
          setLoading(true);
          setTimeout(() => {
            clickLoginButton();
            setLoading(false);
          }, 400);
        } else if (
          location.pathname === '/' &&
          isModalOpen &&
          window.innerWidth < 768
        ) {
          setLoading(true);
          setTimeout(() => {
            closeLoginPage();
            setLoading(false);
          }, 400);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [
      location.pathname,
      navigate,
      closeModal,
      openModal,
      isModalOpen,
      loading,
    ]);
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        isLoginModalOpen,
        openModal,
        loading,
        closeModal,
        clickLoginButton,
        closeLoginPage,
        login,
      }}
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
