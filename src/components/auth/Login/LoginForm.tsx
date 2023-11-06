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
}
const LoginForm = ({ closeModal, isModalOpen }: LoginFormProps) => {
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
        step={step}
        isOpen={isModalOpen}
        isSubmitted={isSubmitted}
        onClose={closeModal}
        handleStepSubmit={handleStepSubmit}
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
        <Button label={'ログイン'} outline color="text-primary" />
      </div>
    </>
  );
};

export default LoginForm;
