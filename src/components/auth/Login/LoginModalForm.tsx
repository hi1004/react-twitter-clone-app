import OAuth from '@/components/auth/Login/OAuth';
import { SignupFormProps } from '@/components/auth/signup/SingupForm';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SignupContext from '@/context/SignupContext';
import { app } from '@/firebaseApp';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LoginModalFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLoginClick: any;
  closeLoginPage: () => void;
  login?: boolean;
}

const LoginModalForm = ({
  onLoginClick,
  closeLoginPage,
  login,
}: LoginModalFormProps) => {
  const { register, errors, isSubmitted, isValid, handleSubmit } = useContext(
    SignupContext as React.Context<SignupFormProps>
  );
  const navigate = useNavigate();
  const onSubmit = handleSubmit!(async data => {
    const { email, password } = data;
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(
        `${auth.currentUser?.displayName}様、ログインに成功しました`
      );
      closeLoginPage();

      navigate('/');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      onLoginClick();
      toast.error('ログインに失敗しました');
    }
  });
  return (
    <div className="flex flex-col justify-center w-full items-centerjustify-center sm:px-10">
      <h2 className="mb-12 text-2xl font-bold text-center">Xにログイン</h2>

      <OAuth login={login} />
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col items-center justify-center w-full px-1"
      >
        <div className="flex flex-col w-full gap-4 mt-4">
          <Input
            id="email"
            label="email"
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <Input
            id="password"
            type="password"
            label="password"
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <div className="mt-5">
            <Button label="ログインする" disabled={!isValid} />
          </div>
        </div>
        <p className="mt-5 font-light">
          アカウントをお持ちでない場合は
          <span
            role="presentation"
            className="cursor-pointer text-primary pointerhover:hover:underline"
            onClick={() => {
              closeLoginPage();
              navigate('/signup');
            }}
          >
            登録
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginModalForm;
