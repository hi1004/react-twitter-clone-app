import SingupForm, {
  SignupFormProps,
} from '@/components/auth/signup/SingupForm';
import ModalContext from '@/context/ModalContext';
import SignupContext from '@/context/SignupContext';
import { useContext } from 'react';

const SignupPage = () => {
  const { closeModal } = useContext(ModalContext);

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
      closeModal={closeModal}
    />
  );
};

export default SignupPage;
