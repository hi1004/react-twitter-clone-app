import LoginForm from '@/components/auth/LoginForm';
import { SignupFormProps } from '@/components/auth/signup/SingupForm';
import ModalContext from '@/context/ModalContext';
import SignupContext from '@/context/SignupContext';
import { useContext } from 'react';

const LoginPage = () => {
  const { isModalOpen, closeModal, openModal } = useContext(ModalContext);
  const { handleStepSubmit, step } = useContext(
    SignupContext as React.Context<SignupFormProps>
  );
  const onAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isModalOpen) {
      openModal();
      handleStepSubmit(1 - step);
    }
  };
  return (
    <LoginForm
      onAccountClick={onAccountClick}
      closeModal={closeModal}
      isModalOpen={isModalOpen}
    />
  );
};

export default LoginPage;
