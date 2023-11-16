import MenuNavItem from '@/components/layout/nav/MenuNavItem';
import { homeModalState } from '@/store/modal/homeModalAtoms';
import { homeResizeState } from '@/store/posts/postAtoms';
import { throttle } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

const MenuNav = () => {
  const isModalOpen = useRecoilValue(homeModalState);
  const isMobileSize = useRecoilValue(homeResizeState);
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);

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
        } else {
          setVisible(true);
        }
        beforeScrollY.current = currentScrollY;
      }, 300),
    [beforeScrollY]
  );
  return (
    <>
      <nav
        className={`fixed transition-opacity duration-700 bottom-0 left-0 z-10 w-full md:sticky md:h-screen md:top-0 md:w-auto
         ${
           isMobileSize && !visible
             ? 'opacity-50 backdrop-blur-none'
             : 'opacity-100 backdrop-blur-sm'
         }
      `}
      >
        {!isModalOpen && <MenuNavItem />}
      </nav>
    </>
  );
};

export default MenuNav;
