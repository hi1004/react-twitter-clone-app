import { RiTwitterXLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="my-12">
      <Link to="/">
        <RiTwitterXLine size={40} />
      </Link>
    </header>
  );
};

export default Header;
