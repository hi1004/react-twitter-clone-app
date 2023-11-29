import { SignupFormProps } from '@/components/auth/signup/SingupForm';
import Button from '@/components/ui/Button';
import ModalContext from '@/context/ModalContext';
import { app } from '@/firebaseApp';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { ReactNode, useContext } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FormStepProps extends SignupFormProps {
  title?: string;
  maxSteps: number;
  children?: ReactNode;
  buttonText: string;
  isAllFieldsValid?: boolean;
}

const FormStep = ({
  title,
  register,
  handleStepSubmit,
  step,
  maxSteps,
  children,
  isValid,
  buttonText,
  handleSubmit,
  isSubmitting,
}: FormStepProps) => {
  const navigate = useNavigate();
  const { isModalOpen } = useContext(ModalContext);

  return (
    <>
      <div className="step flex flex-col gap-2 min-h-[75vh]  md:min-h-[400px] justify-between">
        <div>
          <h3
            className={`flex items-center gap-3 mt-10 text-xl font-bold tracking-tighter ${
              step === 1 && isModalOpen && 'gap-0'
            }`}
          >
            <span
              className="text-gray-500 cursor-pointer pointerhover:hover:text-gray-700 dark:text-slate-400 pointerhover:hover:dark:text-slate-100"
              onClick={() => {
                step > 1 ? handleStepSubmit(-1) : navigate('/');
              }}
            >
              {step > 1 ? (
                <AiOutlineArrowLeft size={28} />
              ) : (
                <>{!isModalOpen && <CgClose size={28} />}</>
              )}
            </span>
            ステップ {step}/{maxSteps}
          </h3>

          <div className="flex flex-col w-full gap-10 sm:gap-5 md:max-w-md">
            <div className="flex flex-col gap-6">
              {title && <h2 className="mt-12 text-2xl font-bold">{title}</h2>}
              {children}
            </div>
          </div>
        </div>
        <div className="mt-8">
          {step === 3 ? (
            <Button
              label={buttonText}
              onClick={handleSubmit!(async data => {
                const { name, email, password } = data;
                try {
                  const auth = getAuth(app);
                  let userCredential;
                  if (email) {
                    userCredential = await createUserWithEmailAndPassword(
                      auth,
                      email,
                      password
                    );
                  }
                  const user = userCredential?.user;
                  if (user) {
                    await updateProfile(user, {
                      displayName: name,
                    });
                  }
                  toast.success(
                    `${user?.displayName}様、新規会員登録に成功しました`
                  );
                  navigate('/');
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                  console.log(error);
                  toast.error(error?.code);
                }
              })}
              register={register}
              disabled={isSubmitting || !isValid}
            />
          ) : (
            <Button
              label={buttonText}
              onClick={() => handleStepSubmit(1)}
              register={register}
              disabled={isSubmitting || !isValid}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FormStep;
