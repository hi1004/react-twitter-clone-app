import { useState } from 'react';
import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { CgDanger } from 'react-icons/cg';

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
  watch?: UseFormWatch<FieldValues>;
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
  watch,
  errors,
}: InputProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registerValid: Record<string, any> = {};
  const errorMessage = (errors[id] as FieldError)?.message || '';
  const passwordValue = watch && watch('password');
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  if (type === 'password' && isVisiblePassword) {
    type = 'text';
  }
  if (id === 'name') {
    registerValid.minLength = {
      value: 2,
      message: `${label}は2文字以上でなければなりません`,
    };
  } else if (id === 'email') {
    registerValid.pattern = {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      message: `${label}が正しくありません`,
    };
  } else if (id === 'tel') {
    registerValid.minLength = {
      value: 11,
      message: `${label}は11文字でなければなりません`,
    };
  } else if (id === 'password') {
    registerValid.minLength = {
      value: 8,
      message: `${label}は8文字以上でなければなりません`,
    };
  } else if (id === 'password_confirm') {
    registerValid.validate = (value: string) => {
      if (value === passwordValue && value.length >= 8) {
        return true;
      } else {
        if (value.length < 8) {
          return `${label}は8文字以上でなければなりません`;
        }
        return `${label}がパスワードと一致していません`;
      }
    };
  }
  return (
    <>
      <div className="relative">
        <input
          id={id}
          type={type}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={`
        relative block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer
        border focus:border-2 text-base
        ${errors[id] ? 'border-rose-500 sm:h-auto' : ''}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-sky-600'}
      ${
        !errorMessage &&
        watch &&
        watch(id) &&
        'border-green-600 focus:border-green-600'
      }
        `}
          {...register(id, {
            required: true,
            ...registerValid,
          })}
          aria-invalid={
            isSubmitted ? (errors[id] ? 'true' : 'false') : undefined
          }
          autoFocus={id === focused}
        />
        <label
          htmlFor={id}
          className={`
        absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white bg-white  px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:-translate-y-4 left-1
        ${errors[id] ? 'peer-focus:text-rose-500 text-rose-500' : ''}
      `}
        >
          {label}
        </label>

        <div className="absolute top-[50%] -translate-y-[50%] right-3">
          <div
            role="presentation"
            onClick={() => setIsVisiblePassword(!isVisiblePassword)}
          >
            {isVisiblePassword
              ? (id === 'password' || id === 'password_confirm') && (
                  <AiFillEye
                    className="cursor-pointer text-primary"
                    size={22}
                  />
                )
              : (id === 'password' || id === 'password_confirm') && (
                  <AiFillEyeInvisible
                    className="cursor-pointer text-primary"
                    size={22}
                  />
                )}
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="mt-2 text-rose-500">
          <small className="flex items-center gap-1">
            <CgDanger size={16} /> {errorMessage}
          </small>
        </div>
      )}
    </>
  );
};

export default Input;
