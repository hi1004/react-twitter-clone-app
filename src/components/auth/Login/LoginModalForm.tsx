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
      navigate('/');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      toast.error('ログインに失敗しました');
      onLoginClick();
    }
  });
  return (
    <form
      className="flex flex-col items-center justify-center w-full px-1 sm:px-16"
      onSubmit={onSubmit}
    >
      <h2 className="mb-12 text-2xl font-bold">Xにログイン</h2>
      <OAuth login={login} />
      <div className="flex flex-col w-full gap-2 mt-4">
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
          <Button label="login" disabled={isSubmitted || !isValid} />
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
  );
};

export default LoginModalForm;
