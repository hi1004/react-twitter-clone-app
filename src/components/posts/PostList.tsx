import DeleteModal from '@/components/posts/modal/DeleteModal';
import EditModal from '@/components/posts/modal/EditModal';
import PostModal from '@/components/posts/modal/PostModal';
import Loader from '@/components/ui/Loader';
import { postState } from '@/store/posts/postAtoms';
import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

const PostNav = React.lazy(() => import('@/components/posts/PostNav'));
const PostForm = React.lazy(() => import('@/components/posts/PostForm'));
const PostListItem = React.lazy(
  () => import('@/components/posts/PostListItem')
);
const HomeAside = React.lazy(
  () => import('@/components/layout/aside/HomeAside')
);

const PostList = () => {
  const posts = useRecoilValue(postState);

  return (
    <div className="flex flex-col relative justify-between gap-4 mt-[3.75rem] md:mt-0 md:flex-row">
      <PostModal />
      <DeleteModal />
      <EditModal />
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
