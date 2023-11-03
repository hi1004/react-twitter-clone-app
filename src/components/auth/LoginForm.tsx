import Button from '@/components/ui/Button';
import { AiFillApple } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  onAccountClick: () => void;
}

const LoginForm = ({ onAccountClick }: LoginFormProps) => {
  return (
    <>
      <form>
        <h1 className="text-4xl font-semibold">すべての話題が、ここに。</h1>
        <div className="flex flex-col gap-3 mb-10">
          <h2 className="text-xl mt-10 font-medium">今すぐ参加しましょう。</h2>

          <Button label={'Googleで登録'} outline icon={FcGoogle} />
          <Button
            label={'Appleのアカウントで登録'}
            outline
            icon={AiFillApple}
          />
          <p className="flex items-center">
            <span className="flex-1 border-t"></span>
            <span className="flex-[0.5] text-sm text-center">または</span>
            <span className="flex-1 border-t"></span>
          </p>
          <Button label={'アカウントを作成'} onClick={onAccountClick} />
          <p className="text-[0.5625rem] text-slate-600">
            アカウントを登録することにより、
            <Link
              to="https://twitter.com/ja/tos"
              target="_blank"
              className="text-primary"
            >
              利用規約
            </Link>
            と
            <Link
              to="https://twitter.com/ja/privacy"
              target="_blank"
              className="text-primary"
            >
              プライバシーポリシー
            </Link>
            （
            <Link
              to="https://help.twitter.com/ja/rules-and-policies/twitter-cookies-japan"
              target="_blank"
              className="text-primary"
            >
              Cookieの使用を含む
            </Link>
            ）に同意したとみなされます。
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">アカウントをお持ちの場合</h3>
          <Button label={'ログイン'} outline color="text-primary" />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
