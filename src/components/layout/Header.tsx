import Toggle from '@/components/ui/Toggle';
import { RiTwitterXLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between my-12 md:h-10 md:justify-end md:mt-5">
      <Link to="/" className="md:hidden">
        <RiTwitterXLine size={40} className="dark:text-white" />
      </Link>
      <Toggle />
    </header>
  );
};

export default Header;
