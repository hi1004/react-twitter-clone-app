import { homeModalState } from '@/store/modal/homeModalAtoms';
import { homeTabState, profileTabState } from '@/store/modal/profileModalAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';

interface PostNavProps {
  isProfilePostNav?: boolean;
}
const PostNav = ({ isProfilePostNav }: PostNavProps) => {
  const isModalOpen = useRecoilValue(homeModalState);
  const [activeTab, setActiveTab] = useRecoilState(profileTabState);
  const [activeHomeTab, setActiveHomeTab] = useRecoilState(homeTabState);
  return (
    <nav
      className={`${isModalOpen ? '-z-10' : 'z-10'} ${
        isProfilePostNav ? 'block' : 'sticky'
      }  md:top-0 top-[70px] left-0 h-[60px] w-full backdrop-blur-sm border-b border-b-slate-300 dark:border-b-slate-700`}
    >
      <ul className="flex h-full">
        <li
          onClick={() => {
            if (isProfilePostNav) {
              setActiveTab('my');
            } else {
              setActiveHomeTab('all');
            }
          }}
          className={`flex items-center justify-center h-full cursor-pointer ${
            isProfilePostNav &&
            activeTab === 'my' &&
            'border-b-4 border-b-primary'
          } ${
            !isProfilePostNav &&
            activeHomeTab === 'all' &&
            'border-b-4 border-b-primary'
          } grow dark:pointerhover:hover:bg-gray-700 pointerhover:hover:font-bold pointerhover:hover:bg-gray-300 bg-opacity-30 dark:bg-opacity-30`}
        >
          {isProfilePostNav ? 'ポスト' : 'おすすめ'}
        </li>
        <li
          onClick={() => {
            if (isProfilePostNav) {
              setActiveTab('like');
            } else {
              setActiveHomeTab('following');
            }
          }}
          className={`flex items-center justify-center h-full  cursor-pointer ${
            isProfilePostNav &&
            activeTab === 'like' &&
            'border-b-4 border-b-primary'
          } ${
            !isProfilePostNav &&
            activeHomeTab === 'following' &&
            'border-b-4 border-b-primary'
          } grow dark:pointerhover:hover:bg-gray-700 pointerhover:hover:font-bold pointerhover:hover:bg-gray-300 bg-opacity-30 dark:bg-opacity-30`}
        >
          {isProfilePostNav ? 'いいね' : 'フォロー中'}
        </li>
      </ul>
    </nav>
  );
};

export default PostNav;
