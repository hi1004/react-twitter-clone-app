import FormInput from '@/components/auth/Form/FormInput';
import FormStep from '@/components/auth/Form/FormStep';
import { SignupFormProps } from '@/components/auth/signup/SingupForm';

const SignupFormStep1 = ({
  step,
  handleStepSubmit,
  isSubmitted,
  clickToggle,
  handleClickToggle,
  watch,
  register,
  isValid,
  isSubmitting,
  errors,
}: SignupFormProps) => {
  return (
    <>
      {step === 1 && (
        <FormStep
          title="アカウントを作成"
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          handleStepSubmit={handleStepSubmit}
          step={step}
          maxSteps={3}
          buttonText="次へ"
          isSubmitting={isSubmitting}
          watch={watch}
          isValid={isValid}
        >
          <FormInput
            id="name"
            label="名前"
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
            watch={watch}
            focused="name"
            required
          />
          <FormInput
            id={clickToggle ? 'tel' : 'email'}
            type={clickToggle ? 'tel' : 'email'}
            label={clickToggle ? '電話番号（不可能）' : 'メールアドレス'}
            register={register}
            errors={errors}
            watch={watch}
            isSubmitted={isSubmitted}
            required
          />
          <span
            onClick={handleClickToggle}
            className="text-sm cursor-pointer w-fit text-primary pointerhover:hover:underline focus:underline"
          >
            かわりに{!clickToggle ? '電話番号' : 'メールアドレス'}を登録する
          </span>
        </FormStep>
      )}
    </>
  );
};

export default SignupFormStep1;
