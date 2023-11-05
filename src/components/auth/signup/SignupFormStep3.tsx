import FormInput from '@/components/auth/Form/FormInput';
import FormStep from '@/components/auth/Form/FormStep';
import { SignupFormProps } from '@/components/auth/signup/SingupForm';

const SignupFormStep3 = ({
  step,
  handleStepSubmit,
  register,
  isSubmitting,
  isSubmitted,
  handleSubmit,
  errors,
}: SignupFormProps) => {
  return (
    <>
      {step === 3 && (
        <FormStep
          title="パスワード設定"
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          handleStepSubmit={handleStepSubmit}
          handleSubmit={handleSubmit}
          step={step}
          maxSteps={3}
          buttonText="ログイン"
          isSubmitting={isSubmitting}
        >
          <FormInput
            id="password"
            type="password"
            label="パスワード"
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
            required
          />
          <FormInput
            id="password_confirm"
            type="password"
            label="パスワード確認"
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
            required
          />
        </FormStep>
      )}
    </>
  );
};

export default SignupFormStep3;
