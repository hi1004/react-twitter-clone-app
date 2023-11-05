import FormStep from '@/components/auth/Form/FormStep';
import { SignupFormProps } from '@/components/auth/signup/SingupForm';

const SignupFormStep2 = ({
  step,
  handleStepSubmit,
  register,
  isSubmitting,
  isSubmitted,
  errors,
}: SignupFormProps) => {
  return (
    <>
      {step === 2 && (
        <FormStep
          title="環境をカスタマイズする"
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          handleStepSubmit={handleStepSubmit}
          step={step}
          maxSteps={3}
          buttonText="次へ"
          isSubmitting={isSubmitting}
        >
          <div className="flex flex-col w-full gap-10 mb-10 sm:gap-5 md:mb-12 lg:mb-20 sm:mb-20 xl:mb-28 md:max-w-md">
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-3 text-lg font-bold">
                  Xコンテンツを閲覧したウェブの場所を追跡
                </p>

                <div className="flex items-start gap-1 px-4 text-sm">
                  <label htmlFor="custom" className="select-none">
                    Xはこのデータを使用して表示内容をカスタマイズします。このウェブ閲覧履歴とともに名前、メール、電話番号が保存されることはありません。
                  </label>
                  <input
                    type="checkbox"
                    id="custom"
                    className="mt-1 indeterminate:bg-red-400"
                  />
                </div>
              </div>
              <p className="mt-6 text-[0.9375rem] text-slate-500">
                登録すると、Xの
                <span className="cursor-pointer pointerhover:hover:underline text-primary">
                  利用規約
                </span>
                、
                <span className="cursor-pointer pointerhover:hover:underline text-primary">
                  プライバシーポリシー
                </span>
                、
                <span className="cursor-pointer pointerhover:hover:underline text-primary">
                  Cookieの使用
                </span>
                に同意したとみなされます。Xは、プライバシーポリシーに記載されている目的で、メールアドレスや電話番号など、あなたの連絡先情報を利用することがあります。{' '}
                <span className="cursor-pointer pointerhover:hover:underline text-primary">
                  詳細はこちら
                </span>
              </p>
            </div>
          </div>
        </FormStep>
      )}
    </>
  );
};

export default SignupFormStep2;
