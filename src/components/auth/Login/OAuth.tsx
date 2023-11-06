import Button from '@/components/ui/Button';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { useContext } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const OAuth = () => {
  const { handleSocalLogin } = useContext(
    AuthContext as React.Context<AuthProps>
  );

  return (
    <>
      <p className="flex items-center">
        <span className="flex-1 border-t"></span>
        <span className="flex-[0.5] text-sm text-center">または</span>
        <span className="flex-1 border-t"></span>
      </p>

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
  );
};

export default OAuth;
