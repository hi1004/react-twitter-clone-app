import Input from '@/components/ui/Input';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface FormSelect {
  register: UseFormRegister<FieldValues>;
  isSubmitted: boolean;
  errors: FieldErrors;
}

const FormSelect = ({ register, isSubmitted, errors }: FormSelect) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-2 font-semibold text-md">生年月日</div>
        <p className="text-xs text-slate-600">
          この情報は公開されません。このアカウントをビジネス、ペットなどに使う場合でも、ご自身の年齢を確認してください。
        </p>
      </div>

      <Input
        label="生年月日"
        type="date"
        id="date"
        register={register}
        isSubmitted={isSubmitted}
        errors={errors}
        required
      />
    </div>
  );
};

export default FormSelect;
