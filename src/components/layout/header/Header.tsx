import HeaderProfile from '@/components/layout/header/HeaderProfile';
import Toggle from '@/components/ui/Toggle';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { useContext } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(AuthContext as React.Context<AuthProps>);

  return (
    <header
      className={`flex items-center justify-between pt-4  ${
        user
          ? ' md:hidden sticky px-4 top-0 backdrop-blur-sm z-10'
          : 'flex mb-12 px-8'
      } md:pt-5`}
    >
      <HeaderProfile user={user} />
      <Link to="/">
        <RiTwitterXLine size={30} className="dark:text-white" />
      </Link>
      <Toggle />
    </header>
  );
};

export default Header;
