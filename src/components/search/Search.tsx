import PostListItem from '@/components/posts/PostListItem';
import DeleteModal from '@/components/posts/modal/DeleteModal';
import EditModal from '@/components/posts/modal/EditModal';
import PostModal from '@/components/posts/modal/PostModal';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { PostProps } from '@/store/posts/postAtoms';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>('');
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagQuery(e?.target?.value.trim());
  };

  useEffect(() => {
    if (user) {
      const postsRef = collection(db, 'posts');
      const postsQuery = query(
        postsRef,
        where('hashTags', 'array-contains-any', [tagQuery]),
        orderBy('createdAt', 'desc')
      );

      onSnapshot(postsQuery, snapShot => {
        const dataObj = snapShot?.docs?.map(doc => ({
          ...doc?.data(),
          id: doc?.id,
        }));
        setPosts(dataObj);
      });
    }
  }, [tagQuery, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${tagQuery}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    if (query) {
      setTagQuery(query);
    }
  }, [location]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <PostModal />
      <DeleteModal />
      <EditModal />
      <form onSubmit={handleSubmit}>
        <div
          className={`relative flex items-center px-4 pt-2 ${
            location.pathname === '/search' && 'border-b'
          } pb-3 border-b-slate-700`}
        >
          <CgSearch className="absolute left-9 focus:text-primary" />
          <input
            id="search"
            value={tagQuery}
            autoComplete="off"
            placeholder="ハッシュタグを検索してください"
            onChange={handleChange}
            className="w-full h-10 pl-12 bg-opacity-50 border-transparent rounded-full outline-none focus:outline-primary bg-slate-300 dark:focus:bg-transparent focus:bg-transparent dark:bg-slate-700"
          />
        </div>
        <ul>
          {location.pathname === '/search' && posts?.length > 0 ? (
            posts.map(post => (
              <>
                <li className={`py-10 text-center`}>
                  {tagQuery.length > 0 ? (
                    <p>
                      検索結果、
                      <span
                        onClick={() => navigate(`/search?query=${tagQuery}`)}
                        className={`${
                          posts?.length > 0 &&
                          'cursor-pointer text-bold text-primary'
                        }`}
                      >
                        {posts?.length}件
                      </span>
                      見つかりました。
                    </p>
                  ) : (
                    <p>ここには何か入れる予定</p>
                  )}
                </li>
                <PostListItem post={post} key={post?.id} />
              </>
            ))
          ) : (
            <li className={`py-10 text-center`}>
              {tagQuery.length > 0 ? (
                <p>
                  検索結果、
                  <span
                    onClick={() => navigate(`/search?query=${tagQuery}`)}
                    className={`${
                      posts?.length > 0 &&
                      'cursor-pointer text-bold text-primary'
                    }`}
                  >
                    {posts?.length}件
                  </span>
                  見つかりました。
                </p>
              ) : (
                <p>ここには何か入れる予定</p>
              )}
            </li>
          )}
        </ul>
      </form>
    </div>
  );
};

export default Search;
