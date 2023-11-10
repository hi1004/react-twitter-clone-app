import ModalNav from '@/components/layout/nav/ModalNav';
import PostDetail from '@/components/posts/PostDetail';

const PostDetailPage = () => {
  return (
    <div className="w-full md:w-auto">
      <ModalNav />
      <PostDetail />
    </div>
  );
};

export default PostDetailPage;
