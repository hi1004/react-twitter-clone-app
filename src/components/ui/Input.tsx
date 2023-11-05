import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  position?: boolean;
  errors: FieldErrors;
  focused?: string;
  isSubmitted: boolean;
}

const Input = ({
  id,
  label,
  type = 'text',
  disabled,
  required,
  register,
  placeholder = ' ',
  focused,
  isSubmitted,
  errors,
}: InputProps) => {
  const [focusType, setFocusType] = useState<string>(' ');

  const handleInputFocus = () => {
    if (id === 'date') {
      setFocusType('date');
    }
  };
  return (
    <div className="relative">
      <input
        id={id}
        type={focusType || type}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={`
        block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer
        border focus:border-2 text-base
        ${errors[id] ? 'border-rose-500 h-[110px] sm:h-auto' : ''}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-sky-600'}

        `}
        {...register(id)}
        aria-invalid={isSubmitted ? (errors[id] ? 'true' : 'false') : undefined}
        onFocus={handleInputFocus}
        onBlur={() => setFocusType('text')}
        autoFocus={id === focused}
      />
      <label
        htmlFor={id}
        className={`
        absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white bg-white  px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:-translate-y-4 left-1
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
