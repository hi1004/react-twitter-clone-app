import ModalNav from '@/components/layout/nav/ModalNav';
import PostList from '@/components/posts/PostList';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { homeModalState } from '@/store/modal/homeModalAtoms';
import { PostProps, postState } from '@/store/posts/postAtoms';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
const HomePage = () => {
  const setIsModalOpen = useSetRecoilState(homeModalState);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const setPosts = useSetRecoilState(postState);

  useEffect(() => {
    if (user) {
      const postRef = collection(db, 'posts');
      const postsQuery = query(postRef, orderBy('createdAt', 'desc'));
      onSnapshot(postsQuery, snapShot => {
        const dataObj = snapShot.docs.map(doc => ({
          ...doc.data(),
          id: doc?.id,
        }));

        setPosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

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
