import HomeAside from '@/components/layout/aside/HomeAside';
import PostListItem from '@/components/posts/PostListItem';
import PostNav from '@/components/posts/PostNav';
import { postState } from '@/store/posts/postAtoms';
import { useRecoilState } from 'recoil';

const PostList = () => {
  const [posts, setPosts] = useRecoilState(postState);

  return (
    <div className="flex flex-col justify-between gap-4 mt-[3.75rem] md:mt-0 md:flex-row">
      <ul className="md:w-[580px] w-full md:border-r dark:md:border-r-slate-700 md:border-r-slate-300">
        <PostNav />
        {posts.map(post => (
          <PostListItem key={post?.id} post={post} />
        ))}
      </ul>
      <HomeAside />
    </div>
  );
};

export default PostList;
