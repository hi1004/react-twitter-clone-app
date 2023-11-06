import SignupFormStep1 from '@/components/auth/signup/step/SignupFormStep1';
import SignupFormStep2 from '@/components/auth/signup/step/SignupFormStep2';
import SignupFormStep3 from '@/components/auth/signup/step/SignupFormStep3';
import SignupFormStep4 from '@/components/auth/signup/step/SignupFormStep4';
import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
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
  watch?: UseFormWatch<FieldValues>;
  isValid?: boolean;
}

const SingupForm = ({
  step,
  handleStepSubmit,
  handleSubmit,
  generateDaysInMonth,
  handleClickToggle,
  clickToggle,
  isSubmitted,
  watch,
  register,
  isValid,
  isSubmitting,
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
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        register={register}
        isValid={isValid}
        watch={watch}
      />
      <SignupFormStep2
        step={step}
        clickToggle={clickToggle}
        errors={errors}
        generateDaysInMonth={generateDaysInMonth}
        handleClickToggle={handleClickToggle}
        handleStepSubmit={handleStepSubmit}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        watch={watch}
        isValid={isValid}
        register={register}
      />
      <SignupFormStep3
        step={step}
        clickToggle={clickToggle}
        errors={errors}
        generateDaysInMonth={generateDaysInMonth}
        handleClickToggle={handleClickToggle}
        handleStepSubmit={handleStepSubmit}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        register={register}
        isValid={isValid}
        watch={watch}
      />
      <SignupFormStep4
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
        isValid={isValid}
        watch={watch}
      />
    </div>
  );
};
export default SingupForm;
