import { SignupFormProps } from '@/components/auth/signup/SingupForm';
import { ReactNode, createContext, useState } from 'react';
import { useForm } from 'react-hook-form';

const SignupContext = createContext<SignupFormProps | undefined>(undefined);

interface SignupProps {
  children: ReactNode;
}

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export const SignupProvider = ({ children }: SignupProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
  const [step, setStep] = useState<number>(1);
  const [clickToggle, setClickToggle] = useState<boolean>(false);

  const handleStepSubmit = (n = 1) => {
    setStep(step + n);
  };

  const generateDaysInMonth = (month: number, year: number) => {
    const daysInMonth = [
      31,
      isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    return Array.from(
      { length: daysInMonth[month - 1] },
      (_, index) => index + 1
    );
  };

  const handleClickToggle = () => {
    setClickToggle(!clickToggle);
  };

  return (
    <SignupContext.Provider
      value={{
        step,
        handleStepSubmit,
        register,
        handleSubmit,
        generateDaysInMonth,
        handleClickToggle,
        clickToggle,
        isSubmitting,
        isSubmitted,
        errors,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export default SignupContext;
