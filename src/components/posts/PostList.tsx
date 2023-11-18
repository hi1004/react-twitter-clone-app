import PostListItem from '@/components/posts/PostListItem';
import PostNav from '@/components/posts/PostNav';
import DeleteModal from '@/components/posts/modal/DeleteModal';
import EditModal from '@/components/posts/modal/EditModal';
import PostModal from '@/components/posts/modal/PostModal';
import Loader from '@/components/ui/Loader';
import { imgModalState, postModalState } from '@/store/modal/homeModalAtoms';
import { homeResizeState, postState } from '@/store/posts/postAtoms';
import React, { Suspense } from 'react';
import { GoPencil } from 'react-icons/go';

import { useRecoilValue, useSetRecoilState } from 'recoil';

const PostForm = React.lazy(() => import('@/components/posts/PostForm'));

const HomeAside = React.lazy(
  () => import('@/components/layout/aside/HomeAside')
);

const PostList = () => {
  const posts = useRecoilValue(postState);
  const setIsPostModalOpen = useSetRecoilState(postModalState);
  const isMobileSize = useRecoilValue(homeResizeState);
  const setIsHidden = useSetRecoilState(imgModalState);
  const isHidden = useRecoilValue(imgModalState);

  return (
    <div className="relative flex flex-col justify-between gap-4 mt-2 md:mt-0 md:flex-row">
      <PostModal />
      <DeleteModal />
      <EditModal />
      <ul className="md:w-[580px] relative mb-[70px] md:mb-0 md:min-h-screen w-full md:border-r dark:md:border-r-slate-700 md:border-r-slate-300">
        {!isMobileSize && <PostNav />}

        <div className="relative">
          <Suspense fallback={<Loader />}>{!isHidden && <PostForm />}</Suspense>

          {posts?.length > 0 &&
            posts.map(post => <PostListItem post={post} key={post?.id} />)}
        </div>
      </ul>
      <div
        onClick={() => {
          setIsPostModalOpen(true);
          setIsHidden(true);
        }}
        className="fixed md:hidden z-10 right-[30px] bottom-[100px] cursor-pointer shadow-lg rounded-full p-4 bg-primary"
      >
        <GoPencil size={30} className="text-white" />
      </div>

      <div className="relative hidden lg:block">
        <Suspense fallback={<Loader />}>
          <HomeAside />
        </Suspense>
      </div>
    </div>
  );
};

export default PostList;
