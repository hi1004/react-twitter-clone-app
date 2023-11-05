import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IconType } from 'react-icons';
interface ButtonProps {
  label: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  color?: string;
  register?: UseFormRegister<FieldValues>;
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
  register,
}: ButtonProps) => {
  return (
    <button
      type="submit"
      className={
        className
          ? className
          : `
        disabled:opacity-70
        disabled:cursor-not-allowed
        disabled:bg-gray-400
        rounded-[9999px]
        relative
        border-[1px]
        w-full
        pointerhover:hover:opacity-80

        ${outline ? 'bg-white' : 'bg-primary'}
        ${outline ? 'border-slate-300' : 'border-primary'}
        ${outline ? `${color ? color : 'text-slate-700'} ` : 'text-white'}
     
        ${small ? 'text-xs' : 'text-sm'}
        ${small ? 'py-1' : 'py-2'}
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
