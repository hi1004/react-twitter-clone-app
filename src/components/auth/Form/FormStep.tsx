import { SignupFormProps } from '@/components/auth/signup/SingupForm';
import Button from '@/components/ui/Button';
import { ReactNode } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

interface FormStepProps extends SignupFormProps {
  title?: string;
  maxSteps: number;
  children?: ReactNode;
  buttonText: string;
}

const FormStep = ({
  title,
  register,
  handleStepSubmit,
  step,
  maxSteps,
  children,
  buttonText,
  closeModal,
  handleSubmit,
  isSubmitting,
}: FormStepProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="step flex flex-col gap-2 min-h-[75vh]  md:min-h-[400px] justify-between">
        <div>
          <h3 className="flex items-center gap-10 mt-4 text-xl font-bold tracking-tighter">
            <span
              className="cursor-pointer md:hidden"
              onClick={() => {
                step > 1 ? handleStepSubmit(-1) : navigate('/login');
              }}
            >
              {step > 1 ? (
                <AiOutlineArrowLeft size={28} />
              ) : (
                <CgClose size={28} />
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
                await new Promise(r => setTimeout(r, 1000));
                closeModal?.();
                alert(JSON.stringify(data));
                navigate('/');
              })}
              register={register}
              disabled={isSubmitting}
            />
          ) : (
            <Button
              label={buttonText}
              onClick={() => handleStepSubmit(1)}
              register={register}
              disabled={isSubmitting}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FormStep;
