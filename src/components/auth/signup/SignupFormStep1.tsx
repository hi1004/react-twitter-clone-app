import FormInput from '@/components/auth/Form/FormInput';
import FormSelect from '@/components/auth/Form/FormSelect';
import FormStep from '@/components/auth/Form/FormStep';
import { SignupFormProps } from '@/components/auth/signup/SingupForm';

const SignupFormStep1 = ({
  step,
  handleStepSubmit,
  register,
  isSubmitting,
  isSubmitted,
  errors,
  clickToggle,
  generateDaysInMonth,
  handleClickToggle,
}: SignupFormProps) => {
  const years = Array.from(
    { length: new Date().getFullYear() - 1902 },
    (_, index) => `${new Date().getFullYear() - index}年`
  );
  const months = Array.from({ length: 12 }, (_, index) => `${index + 1}月`);
  const days = generateDaysInMonth!(2, 2023).map(
    (_, index) => `${index + 1}日`
  );
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
          <span
            onClick={handleClickToggle}
            className="text-sm text-right cursor-pointer text-primary pointerhover:hover:underline focus:underline"
          >
            かわりに{!clickToggle ? '電話番号' : 'メールアドレス'}を登録する
          </span>
          <FormSelect
            years={years}
            months={months}
            days={days}
            errors={errors}
            isSubmitted={isSubmitted}
            register={register}
          />
        </FormStep>
      )}
    </>
  );
};

export default SignupFormStep1;
