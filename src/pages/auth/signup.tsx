import SingupForm, {
  SignupFormProps,
} from '@/components/auth/signup/SingupForm';
import SignupContext from '@/context/SignupContext';
import { useContext } from 'react';

const SignupPage = () => {
  const {
    step,
    handleStepSubmit,
    register,
    handleSubmit,
    generateDaysInMonth,
    handleClickToggle,
    clickToggle,
    isSubmitting,
    watch,
    isSubmitted,
    isValid,
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
      isValid={isValid}
      watch={watch}
    />
  );
};

export default SignupPage;
