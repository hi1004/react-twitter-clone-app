import Input, { InputProps } from '@/components/ui/Input';

const FormInput = ({
  id,
  label,
  type,
  register,
  errors,
  isSubmitted,
  required,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Input
        id={id}
        type={type}
        label={label}
        register={register}
        errors={errors}
        isSubmitted={isSubmitted}
        required={required}
        focused="name"
      />
    </div>
  );
};

export default FormInput;
