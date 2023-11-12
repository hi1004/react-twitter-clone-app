import LoginForm from '@/components/auth/Login/LoginForm';
import LoginModalForm from '@/components/auth/Login/LoginModalForm';
import OAuth from '@/components/auth/Login/OAuth';
import { SignupFormProps } from '@/components/auth/signup/SingupForm';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ModalContext from '@/context/ModalContext';
import SignupContext from '@/context/SignupContext';
import React, { useContext } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const {
    isModalOpen,
    closeModal,
    isLoginModalOpen,
    openModal,
    login,
    clickLoginButton,
    closeLoginPage,
  } = useContext(ModalContext);
  const { handleStepSubmit, step, isSubmitted } = useContext(
    SignupContext as React.Context<SignupFormProps>
  );

  const onAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isModalOpen) {
      openModal();
      handleStepSubmit(1 - step);
    }
  };
  const onLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoginModalOpen) {
      clickLoginButton();
    }
  };
  return (
    <>
      <form className="sm:max-w-sm sm:m-auto md:flex md:max-w-[100%] md:w-full md:justify-center md:items-center md:gap-8">
        <RiTwitterXLine className="max-w-[757px] max-h-[444px] w-full h-full flex-1 hidden md:block" />
        <div className="flex-1">
          <h1 className="text-4xl leading-[50px] font-semibold sm:text-6xl sm:leading-[80px] sm:font-bold">
            すべての話題が、ここに。
          </h1>

          <div className="flex flex-col-reverse gap-3 mb-10 sm:gap-5 md:mb-12 lg:mb-20 sm:mb-20 xl:mb-28 md:max-w-sm">
            <Button label={'アカウントを作成'} onClick={onAccountClick} />

            <OAuth />

            <p className="text-[0.6rem] text-slate-600 dark:text-slate-200 md:text-xs">
              アカウントを登録することにより、
              <Link
                to="https://twitter.com/ja/tos"
                target="_blank"
                className="text-primary"
              >
                利用規約
              </Link>
              と
              <Link
                to="https://twitter.com/ja/privacy"
                target="_blank"
                className="text-primary"
              >
                プライバシーポリシー
              </Link>
              （
              <Link
                to="https://help.twitter.com/ja/rules-and-policies/twitter-cookies-japan"
                target="_blank"
                className="text-primary"
              >
                Cookieの使用を含む
              </Link>
              ）に同意したとみなされます。
            </p>
            <h2 className="mt-10 text-xl font-medium sm:text-3xl sm:font-semibold">
              今すぐ参加しましょう。
            </h2>
          </div>

          <LoginForm
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            onLoginClick={onLoginClick}
          />
        </div>
      </form>
      {login && (
        <Modal
          isOpen={isLoginModalOpen}
          onClose={closeLoginPage}
          isSubmitted={isSubmitted}
        >
          <LoginModalForm
            onLoginClick={onLoginClick}
            closeLoginPage={closeLoginPage}
            login={login}
          />
        </Modal>
      )}
      <Footer />
    </>
  );
};

export default LoginPage;
