import HomeAside from '@/components/layout/aside/HomeAside';
import ModalNav from '@/components/layout/nav/ModalNav';
import PostDetail from '@/components/posts/PostDetail';

const PostDetailPage = () => {
  return (
    <div className="flex w-full md:w-auto">
      <ModalNav />
      <PostDetail />
      <div className="relative hidden lg:block">
        <HomeAside />
      </div>
    </div>
  );
};

export default PostDetailPage;
