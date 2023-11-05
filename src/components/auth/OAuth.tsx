import Button from '@/components/ui/Button';
import { AiFillApple } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const OAuth = () => {
  return (
    <>
      <Button label={'Googleで登録'} outline icon={FcGoogle} />
      <Button label={'Appleのアカウントで登録'} outline icon={AiFillApple} />
      <p className="flex items-center">
        <span className="flex-1 border-t"></span>
        <span className="flex-[0.5] text-sm text-center">または</span>
        <span className="flex-1 border-t"></span>
      </p>
    </>
  );
};

export default OAuth;
