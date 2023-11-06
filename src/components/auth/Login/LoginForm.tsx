import SingupForm, {
  SignupFormProps,
} from '@/components/auth/signup/SingupForm';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import SignupContext from '@/context/SignupContext';
import { useContext } from 'react';

export interface LoginFormProps {
  closeModal: () => void;
  isModalOpen: boolean;
  onLoginClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const LoginForm = ({
  closeModal,
  isModalOpen,
  onLoginClick,
}: LoginFormProps) => {
  const {
    step,
    handleStepSubmit,
    register,
    isValid,
    handleSubmit,
    generateDaysInMonth,
    handleClickToggle,
    clickToggle,
    isSubmitting,
    watch,
    isSubmitted,
    errors,
  } = useContext(SignupContext as React.Context<SignupFormProps>);
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        isSubmitted={isSubmitted}
        onClose={closeModal}
      >
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
          isValid={isValid}
          watch={watch}
        />
      </Modal>
      <div className="flex flex-col gap-4 md:max-w-sm">
        <h3 className="font-medium">アカウントをお持ちの場合</h3>
        <Button
          label={'ログイン'}
          outline
          color="text-primary"
          onClick={onLoginClick}
        />
      </div>
    </>
  );
};

export default LoginForm;
