import HeaderProfile from '@/components/layout/header/HeaderProfile';
import PostNav from '@/components/posts/PostNav';
import Toggle from '@/components/ui/Toggle';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { postIdState } from '@/store/posts/postAtoms';
import { throttle } from 'lodash';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const Header = () => {
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const location = useLocation();
  const currentPostId = useRecoilValue(postIdState);
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);
  const params = useParams();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY;

        if (beforeScrollY.current < currentScrollY) {
          setVisible(false);
          beforeScrollY.current = currentScrollY - 130;
        } else {
          setVisible(true);
          beforeScrollY.current = currentScrollY;
        }
        if (beforeScrollY.current <= 130) {
          beforeScrollY.current = 0;
        }
      }, 300),
    [beforeScrollY]
  );
  return (
    <header
      className={`flex flex-col  transition-transform duration-700 items-center justify-between pt-4  ${
        user
          ? 'md:hidden sticky top-0 backdrop-blur-sm z-10'
          : 'flex mb-12 px-8'
      } ${
        (location.pathname === `/posts/edit/${currentPostId}` ||
          location.pathname === `/posts/${currentPostId}` ||
          location.pathname === `/profile/${params.id}`) &&
        'hidden'
      }
      ${
        user && !visible
          ? ' -translate-y-[130px]  -mt-[130px]'
          : 'translate-y-0'
      }
      md:pt-5`}
    >
      <div className="flex items-center justify-between w-full px-4 ">
        <HeaderProfile user={user} />
        <Link to="/">
          <RiTwitterXLine size={30} className="dark:text-white" />
        </Link>
        <Toggle />
      </div>
      {user && <PostNav />}
    </header>
  );
};

export default Header;
