import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface FormSelect {
  years: string[];
  months: string[];
  days: string[];
  register: UseFormRegister<FieldValues>;
  isSubmitted: boolean;
  errors: FieldErrors;
}

const FormSelect = ({
  years,
  months,
  days,
  register,
  isSubmitted,
  errors,
}: FormSelect) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-2 font-semibold text-md">生年月日</div>
        <p className="text-xs text-slate-600">
          この情報は公開されません。このアカウントをビジネス、ペットなどに使う場合でも、ご自身の年齢を確認してください。
        </p>
      </div>
      <div className="sm:hidden">
        <Input
          label="生年月日"
          id="date"
          register={register}
          isSubmitted={isSubmitted}
          errors={errors}
          required
        />
      </div>
      <div className="hidden grid-cols-3 gap-2 sm:grid">
        <Select id="years" datas={years} label="年" />
        <Select id="months" datas={months} label="月" />
        <Select id="days" datas={days} label="日" />
      </div>
    </div>
  );
};

export default FormSelect;
