import OAuth from '@/components/auth/OAuth';
import SingupForm, {
  SignupFormProps,
} from '@/components/auth/signup/SingupForm';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import SignupContext from '@/context/SignupContext';
import { useContext } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  onAccountClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

const LoginForm = ({
  onAccountClick,
  closeModal,
  isModalOpen,
}: LoginFormProps) => {
  const {
    step,
    handleStepSubmit,
    register,
    handleSubmit,
    generateDaysInMonth,
    handleClickToggle,
    clickToggle,
    isSubmitting,
    isSubmitted,
    errors,
  } = useContext(SignupContext as React.Context<SignupFormProps>);
  return (
    <>
      <form className="sm:max-w-sm sm:m-auto md:flex md:max-w-[80%] md:justify-center md:items-center md:gap-8">
        <RiTwitterXLine className="max-w-[757px] max-h-[444px] w-full h-full flex-1 hidden md:block" />
        <div className="flex-1">
          <h1 className="text-4xl leading-[50px] font-semibold sm:text-6xl sm:leading-[80px] sm:font-bold">
            すべての話題が、ここに。
          </h1>
          <div className="flex flex-col gap-3 mb-10 sm:gap-5 md:mb-12 lg:mb-20 sm:mb-20 xl:mb-28 md:max-w-sm">
            <h2 className="mt-10 text-xl font-medium sm:text-3xl sm:font-semibold">
              今すぐ参加しましょう。
            </h2>

            <OAuth />
            <Button label={'アカウントを作成'} onClick={onAccountClick} />
            <p className="text-[0.5625rem] text-slate-600 md:text-xs">
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
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <SingupForm
              step={step}
              handleStepSubmit={handleStepSubmit}
              register={register}
              handleSubmit={handleSubmit}
              generateDaysInMonth={generateDaysInMonth}
              handleClickToggle={handleClickToggle}
              clickToggle={clickToggle}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              errors={errors}
            />
          </Modal>
          <div className="flex flex-col gap-4 md:max-w-sm">
            <h3 className="font-medium">アカウントをお持ちの場合</h3>
            <Button label={'ログイン'} outline color="text-primary" />
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default LoginForm;
