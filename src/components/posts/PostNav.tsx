import { homeModalState } from '@/store/Nav/homeModalAtoms';
import { useRecoilValue } from 'recoil';

const PostNav = () => {
  const isModalOpen = useRecoilValue(homeModalState);
  return (
    <nav
      className={`${
        isModalOpen ? '-z-10' : 'z-10'
      } fixed md:sticky md:top-0 top-[70px] left-0 h-[60px] w-full backdrop-blur-sm border-b border-b-slate-300 dark:border-b-slate-700`}
    >
      <ul className="flex h-full">
        <li className="flex items-center justify-center h-full cursor-pointer grow dark:pointerhover:hover:bg-gray-700 pointerhover:hover:font-bold pointerhover:hover:bg-gray-300 bg-opacity-30 dark:bg-opacity-30">
          おすすめ
        </li>
        <li className="flex items-center justify-center cursor-pointer grow dark:pointerhover:hover:bg-gray-700 pointerhover:hover:font-bold pointerhover:hover:bg-gray-300 bg-opacity-30 dark:bg-opacity-30 ">
          フォロー中
        </li>
      </ul>
    </nav>
  );
};

export default PostNav;