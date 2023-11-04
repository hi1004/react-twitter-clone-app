import { RiTwitterXLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="my-12 md:h-10">
      <Link to="/" className="md:hidden">
        <RiTwitterXLine size={40} />
      </Link>
    </header>
  );
};

export default Header;
