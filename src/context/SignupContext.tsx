import { SignupFormProps } from '@/components/auth/signup/SingupForm';
import { ReactNode, createContext, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const SignupContext = createContext<SignupFormProps | undefined>(undefined);

interface SignupProps {
  children: ReactNode;
}

export const SignupProvider = ({ children }: SignupProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitted, errors, isValid },
    watch,
  } = useForm<FieldValues>({ mode: 'onChange' });
  const [step, setStep] = useState<number>(1);
  const [clickToggle, setClickToggle] = useState<boolean>(false);

  const handleStepSubmit = (n = 1) => {
    setStep(step + n);
  };

  const handleClickToggle = () => {
    setClickToggle(!clickToggle);
    setValue('email', '');
    setValue('tel', '');
  };

  return (
    <SignupContext.Provider
      value={{
        step,
        handleStepSubmit,
        register,
        handleSubmit,
        handleClickToggle,
        clickToggle,
        isSubmitting,
        isSubmitted,
        watch,
        isValid,
        errors,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export default SignupContext;
