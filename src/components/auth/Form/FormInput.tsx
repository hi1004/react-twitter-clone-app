import Input, { InputProps } from '@/components/ui/Input';

const FormInput = ({
  id,
  label,
  type,
  register,
  focused,
  errors,
  isSubmitted,
  watch,
  required,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <Input
        id={id}
        type={type}
        label={label}
        register={register}
        errors={errors}
        isSubmitted={isSubmitted}
        watch={watch}
        required={required}
        focused={focused}
      />
    </div>
  );
};

export default FormInput;
