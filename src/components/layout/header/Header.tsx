import HeaderProfile from '@/components/layout/header/HeaderProfile';
import Toggle from '@/components/ui/Toggle';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { useContext } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(AuthContext as React.Context<AuthProps>);

  return (
    <header className="flex items-center justify-between my-4 md:h-10 md:mt-5">
      <HeaderProfile user={user} />
      <Link to="/" className="">
        <RiTwitterXLine size={40} className="dark:text-white" />
      </Link>
      <Toggle />
    </header>
  );
};

export default Header;
