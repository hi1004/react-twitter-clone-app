import SignupFormStep1 from '@/components/auth/signup/SignupFormStep1';
import SignupFormStep2 from '@/components/auth/signup/SignupFormStep2';
import SignupFormStep3 from '@/components/auth/signup/SignupFormStep3';
import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

export interface SignupFormProps {
  step: number;
  handleStepSubmit: (n: number) => void;
  register: UseFormRegister<FieldValues>;
  handleSubmit?: UseFormHandleSubmit<FieldValues, undefined>;
  generateDaysInMonth?: (day: number, year: number) => number[];
  handleClickToggle?: () => void;
  clickToggle?: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  errors: FieldErrors;
  closeModal?: () => void;
}

const SingupForm = ({
  step,
  handleStepSubmit,
  closeModal,
  register,
  handleSubmit,
  generateDaysInMonth,
  handleClickToggle,
  clickToggle,
  isSubmitting,
  isSubmitted,
  errors,
}: SignupFormProps) => {
  return (
    <div className="w-full m-auto md:max-w-md">
      <SignupFormStep1
        step={step}
        clickToggle={clickToggle}
        errors={errors}
        generateDaysInMonth={generateDaysInMonth}
        handleClickToggle={handleClickToggle}
        handleStepSubmit={handleStepSubmit}
        handleSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        register={register}
        closeModal={closeModal}
      />
      <SignupFormStep2
        step={step}
        clickToggle={clickToggle}
        errors={errors}
        generateDaysInMonth={generateDaysInMonth}
        handleClickToggle={handleClickToggle}
        handleStepSubmit={handleStepSubmit}
        handleSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        register={register}
        closeModal={closeModal}
      />
      <SignupFormStep3
        step={step}
        clickToggle={clickToggle}
        errors={errors}
        generateDaysInMonth={generateDaysInMonth}
        handleClickToggle={handleClickToggle}
        handleStepSubmit={handleStepSubmit}
        handleSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        register={register}
        closeModal={closeModal}
      />
    </div>
  );
};
export default SingupForm;
