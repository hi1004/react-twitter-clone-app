import Loader from '@/components/ui/Loader';
import { db } from '@/firebaseApp';
import { PostProps, postState } from '@/store/posts/postAtoms';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import React, { Suspense, useEffect } from 'react';
import { useRecoilState } from 'recoil';

const PostNav = React.lazy(() => import('@/components/posts/PostNav'));
const PostForm = React.lazy(() => import('@/components/posts/PostForm'));
const PostListItem = React.lazy(
  () => import('@/components/posts/PostListItem')
);
const HomeAside = React.lazy(
  () => import('@/components/layout/aside/HomeAside')
);

const PostList = () => {
  const [posts, setPosts] = useRecoilState(postState);

  useEffect(() => {
    const postRef = collection(db, 'posts');
    const postsQuery = query(postRef, orderBy('createdAt', 'desc'));
    onSnapshot(postsQuery, snapShot => {
      const dataObj = snapShot.docs.map(doc => ({
        ...doc.data(),
        id: doc?.id,
      }));

      setPosts(dataObj as PostProps[]);
    });
  }, []);

  return (
    <div className="flex flex-col justify-between gap-4 mt-[3.75rem] md:mt-0 md:flex-row">
      <ul className="md:w-[580px] relative min-h-screen w-full md:border-r dark:md:border-r-slate-700 md:border-r-slate-300">
        <Suspense fallback={<Loader />}>
          <PostNav />
          <div className="relative">
            <PostForm />
            {posts?.length > 0 &&
              posts.map(post => (
                <Suspense key={post?.id} fallback={<Loader />}>
                  <PostListItem post={post} />
                </Suspense>
              ))}
          </div>
        </Suspense>
      </ul>
      <div className="relative hidden lg:block">
        <Suspense fallback={<Loader />}>
          <HomeAside />
        </Suspense>
      </div>
    </div>
  );
};

export default PostList;
