import { UserProps } from '@/components/follow/FollowingBox';
import ModalNav from '@/components/layout/nav/ModalNav';
import PostList from '@/components/posts/PostList';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { homeModalState } from '@/store/modal/homeModalAtoms';
import { homeTabState } from '@/store/modal/profileModalAtoms';
import { PostProps, postState } from '@/store/posts/postAtoms';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
const HomePage = () => {
  const setIsModalOpen = useSetRecoilState(homeModalState);
  const [followingPost, setFollowingPost] = useState<PostProps[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>(['']);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const [posts, setPosts] = useRecoilState(postState);
  const activeHomeTab = useRecoilValue(homeTabState);
  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, 'following', user?.uid);
      onSnapshot(ref, doc => {
        setFollowingIds(['']);
        doc
          ?.data()
          ?.users?.map((user: UserProps) =>
            setFollowingIds((prev: string[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      const postRef = collection(db, 'posts');
      const postsQuery = query(postRef, orderBy('createdAt', 'desc'));
      const followingQuery = query(
        postRef,
        where('uid', 'in', followingIds),
        orderBy('createdAt', 'desc')
      );
      onSnapshot(postsQuery, snapShot => {
        const dataObj = snapShot.docs.map(doc => ({
          ...doc.data(),
          id: doc?.id,
        }));

        setPosts(dataObj as PostProps[]);
      });

      onSnapshot(followingQuery, snapShot => {
        const dataObj = snapShot.docs.map(doc => ({
          ...doc.data(),
          id: doc?.id,
        }));

        setFollowingPost(dataObj as PostProps[]);
      });
    }
  }, [user, followingIds]);

  useEffect(() => {
    if (user?.uid) getFollowingIds();
  }, [getFollowingIds, user?.uid]);

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
      {activeHomeTab === 'all' && <PostList posts={posts} />}
      {activeHomeTab === 'following' && <PostList posts={followingPost} />}
    </div>
  );
};

export default HomePage;
