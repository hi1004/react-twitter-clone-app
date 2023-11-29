import FormInput from '@/components/auth/Form/FormInput';
import FormStep from '@/components/auth/Form/FormStep';
import { SignupFormProps } from '@/components/auth/signup/SingupForm';

const SignupFormStep3 = ({
  step,
  handleStepSubmit,
  register,
  isSubmitting,
  isSubmitted,
  errors,
  clickToggle,
  handleSubmit,
  isValid,
}: SignupFormProps) => {
  return (
    <>
      {step === 3 && (
        <FormStep
          title="アカウント確認"
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          handleStepSubmit={handleStepSubmit}
          step={step}
          handleSubmit={handleSubmit}
          maxSteps={3}
          buttonText="ログイン"
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          <FormInput
            id="name"
            label="名前"
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
            required
          />
          <FormInput
            id={clickToggle ? 'tel' : 'email'}
            type={clickToggle ? 'tel' : 'email'}
            label={clickToggle ? '電話番号' : 'メールアドレス'}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
            required
          />

          <FormInput
            id="password"
            type="password"
            label="パスワード"
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
