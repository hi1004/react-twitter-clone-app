import FormInput from '@/components/auth/Form/FormInput';
import FormStep from '@/components/auth/Form/FormStep';
import { SignupFormProps } from '@/components/auth/signup/SingupForm';

const SignupFormStep2 = ({
  step,
  handleStepSubmit,
  register,
  isSubmitting,
  isSubmitted,
  errors,
  watch,
  isValid,
}: SignupFormProps) => {
  return (
    <>
      {step === 2 && (
        <FormStep
          title="パスワード設定"
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          handleStepSubmit={handleStepSubmit}
          step={step}
          maxSteps={3}
          buttonText="次へ"
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          <FormInput
            id="password"
            type="password"
            label="パスワード"
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
            focused="password"
            watch={watch}
            required
          />
          <FormInput
            id="password_confirm"
            type="password"
            label="パスワード確認"
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
            watch={watch}
            required
          />
        </FormStep>
      )}
    </>
  );
};

export default SignupFormStep2;
