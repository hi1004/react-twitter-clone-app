import PostEditForm from '@/components/posts/PostEditForm';
import Loader from '@/components/ui/Loader';
import { db } from '@/firebaseApp';
import { editModalState, postModalState } from '@/store/modal/homeModalAtoms';
import { PostProps, postState } from '@/store/posts/postAtoms';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import React, { Suspense, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';
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
  const [isPostModalOpen, setIsPostModalOpen] = useRecoilState(postModalState);
  const [isEditModalOpen, setIsEditModalOpen] = useRecoilState(editModalState);
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
    <div className="flex flex-col relative justify-between gap-4 mt-[3.75rem] md:mt-0 md:flex-row">
      {isPostModalOpen && (
        <Suspense fallback={<Loader />}>
          <div
            className="fixed top-0 left-0 z-10 w-full h-full bg-slate-800 bg-opacity-40"
            onClick={e => {
              e.stopPropagation();
              setIsPostModalOpen(false);
            }}
          ></div>
          <div className="fixed  left-1/2  -translate-x-1/2 z-30 rounded-3xl dark:bg-black bg-white w-[580px] top-36">
            <div
              role="presentation"
              onClick={() => {
                setIsPostModalOpen(false);
              }}
              className="flex items-center h-10 p-3 rounded-full cursor-pointer w-max pointerhover:hover:bg-gray-200 dark:pointerhover:hover:bg-gray-600 bg-opacity-20"
            >
              <CgClose />
            </div>
            <PostForm />
          </div>
        </Suspense>
      )}
      {isEditModalOpen && (
        <Suspense fallback={<Loader />}>
          <div
            className="fixed top-0 left-0 z-10 w-full h-full bg-slate-800 bg-opacity-40"
            onClick={e => {
              e.stopPropagation();
              setIsEditModalOpen(false);
            }}
          ></div>

          <div className="fixed hidden md:block left-1/2  -translate-x-1/2 z-30 rounded-3xl dark:bg-black bg-white w-[580px] top-36">
            <div
              role="presentation"
              onClick={() => {
                setIsEditModalOpen(false);
              }}
              className="flex items-center h-10 p-3 rounded-full cursor-pointer w-max pointerhover:hover:bg-gray-200 dark:pointerhover:hover:bg-gray-600 bg-opacity-20"
            >
              <CgClose />
            </div>
            <PostEditForm />
          </div>
        </Suspense>
      )}

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
