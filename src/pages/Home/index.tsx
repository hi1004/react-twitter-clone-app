import ModalNav from '@/components/layout/nav/ModalNav';
import PostList from '@/components/posts/PostList';
import { homeModalState } from '@/store/Nav/homeModalAtoms';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const HomePage = () => {
  const setIsModalOpen = useSetRecoilState(homeModalState);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsModalOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="w-full md:w-auto">
      <ModalNav />
      <PostList />
    </div>
  );
};

export default HomePage;
