import HomeAside from '@/components/layout/aside/homeAside';
import PostListItem from '@/components/posts/PostListItem';
import PostNav from '@/components/posts/PostNav';

const PostList = () => {
  return (
    <div className="flex flex-col justify-between gap-4 mt-[3.75rem] md:mt-0 md:flex-row">
      <ul className="md:w-[580px] w-full md:border-r dark:md:border-r-slate-700 md:border-r-slate-300">
        <PostNav />
        {[...new Array(20)].map((post, index) => (
          <PostListItem key={index} post={post} />
        ))}
      </ul>
      <HomeAside />
    </div>
  );
};

export default PostList;
