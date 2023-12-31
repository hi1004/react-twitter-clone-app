import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IconType } from 'react-icons';
interface ButtonProps {
  label: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  color?: string;
  bgcolor?: string;
  borderColor?: string;
  name?: string;
  register?: UseFormRegister<FieldValues>;
  id?: string;
}
const Button = ({
  label,
  className,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  color,
  borderColor,
  bgcolor,
  register,
  id,
}: ButtonProps) => {
  return (
    <button
      id={id}
      name={id}
      className={
        className
          ? className
          : `
        disabled:opacity-70
        disabled:bg-opacity-70
        disabled:cursor-not-allowed
        disabled:bg-primary
        disabled:border-primary
        font-bold
        rounded-[9999px]
        relative
        border-[1px]
        w-full
        pointerhover:hover:opacity-80
        ${bgcolor && bgcolor}
        ${borderColor && borderColor}

        ${outline ? 'bg-white' : 'bg-primary'}
        ${outline ? 'border-slate-300' : 'border-primary'}
        ${outline ? `${color ? color : 'text-slate-700'} ` : 'text-white'}
        ${disabled && 'border-slate-400'}
        ${small ? 'text-xs' : 'text-sm'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-medium' : 'font-semibold'}
        `
      }
      onClick={onClick}
      {...(register?.(label),
      {
        disabled,
      })}
    >
      <span className="flex justify-center gap-2">
        {Icon && <Icon size={24} className="left-4" />}
        {label}
      </span>
    </button>
  );
};

export default Button;
