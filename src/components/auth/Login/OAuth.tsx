import Button from '@/components/ui/Button';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { useContext } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

interface OAutProps {
  login?: boolean;
}

const OAuth = ({ login }: OAutProps) => {
  const { handleSocalLogin } = useContext(
    AuthContext as React.Context<AuthProps>
  );

  return (
    <div className="flex flex-col w-full gap-2">
      {login ? (
        <>
          <Button
            label={'Githubのアカウントでログイン'}
            id="login-github"
            outline
            icon={AiFillGithub}
            onClick={handleSocalLogin}
          />
          <Button
            label={'Googleでログイン'}
            id="login-google"
            outline
            icon={FcGoogle}
            onClick={handleSocalLogin}
          />
        </>
      ) : (
        <>
          <Button
            label={'Githubのアカウントで登録'}
            id="github"
            outline
            icon={AiFillGithub}
            onClick={handleSocalLogin}
          />
          <Button
            label={'Googleで登録'}
            id="google"
            outline
            icon={FcGoogle}
            onClick={handleSocalLogin}
          />
        </>
      )}

      <p className="flex items-center w-full">
        <span className="flex-1 border-t"></span>
        <span className="flex-[0.5] text-sm text-center">または</span>
        <span className="flex-1 border-t"></span>
      </p>
    </div>
  );
};

export default OAuth;
