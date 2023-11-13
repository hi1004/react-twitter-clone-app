import HomeAside from '@/components/layout/aside/HomeAside';
import ModalNav from '@/components/layout/nav/ModalNav';
import PostDetail from '@/components/posts/PostDetail';
import Loader from '@/components/ui/Loader';
import { Suspense } from 'react';

const PostDetailPage = () => {
  return (
    <div className="flex w-full md:w-auto">
      <ModalNav />
      <PostDetail />
      <div className="relative hidden lg:block">
        <Suspense fallback={<Loader />}>
          <HomeAside />
        </Suspense>
      </div>
    </div>
  );
};

export default PostDetailPage;
