import MenuNavItem from '@/components/layout/nav/MenuNavItem';
import { homeModalState } from '@/store/Nav/homeModalAtoms';
import { useRecoilValue } from 'recoil';

const MenuNav = () => {
  const isModalOpen = useRecoilValue(homeModalState);
  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full md:sticky md:h-screen md:top-0 md:w-auto">
        {!isModalOpen && <MenuNavItem />}
      </nav>
    </>
  );
};

export default MenuNav;
