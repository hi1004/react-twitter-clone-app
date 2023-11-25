import HeaderProfile from '@/components/layout/header/HeaderProfile';
import PostListItem from '@/components/posts/PostListItem';
import PostNav from '@/components/posts/PostNav';
import DeleteModal from '@/components/posts/modal/DeleteModal';
import EditModal from '@/components/posts/modal/EditModal';
import PostModal from '@/components/posts/modal/PostModal';
import Button from '@/components/ui/Button';
import AuthContext from '@/context/AuthContext';
import { app, db } from '@/firebaseApp';
import {
  homeModalState,
  imgModalState,
  postModalState,
  profileModalState,
} from '@/store/modal/homeModalAtoms';
import { PostProps } from '@/store/posts/postAtoms';
import { getAuth, signOut } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { throttle } from 'lodash';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GoPencil } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

const ProfileInfo = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const setIsModalOpen = useSetRecoilState(homeModalState);
  const currentUser = useContext(AuthContext);
  const user = posts[0] || currentUser?.user;
  const params = useParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);
  const setIsHidden = useSetRecoilState(imgModalState);
  const setIsPostModalOpen = useSetRecoilState(postModalState);
  const setIsProfileEditModalOpen = useSetRecoilState(profileModalState);
  useEffect(() => {
    if (params?.id) {
      window.scrollTo(0, 0);
      const postsRef = collection(db, 'posts');
      const postsQuery = query(
        postsRef,
        where('uid', '==', params?.id),
        orderBy('createdAt', 'desc')
      );

      onSnapshot(postsQuery, snapShot => {
        const dataObj = snapShot.docs.map(doc => ({
          ...doc.data(),
          id: doc?.id,
        }));

        setPosts(dataObj);
      });
    }
  }, [params?.id]);
  const mention = `@
  ${
    !user?.email
      ? user?.displayName
          ?.replace(/[^\w\s]/g, '')
          ?.match(/\S+\s/)?.[0]
          ?.toLocaleLowerCase()
      : user?.email?.replace(/@.*$/, '').toLocaleLowerCase()
  }
    `;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY;
        if (beforeScrollY.current < currentScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        beforeScrollY.current = currentScrollY;
      }, 300),
    [beforeScrollY]
  );

  return (
    <>
      <PostModal />
      <DeleteModal />
      <EditModal />

      <div
        onClick={() => {
          setIsPostModalOpen(true);
          setIsModalOpen(false);
          setIsHidden(false);
        }}
        className="fixed md:hidden z-10 right-[30px] bottom-[100px] cursor-pointer shadow-lg rounded-full p-4 bg-primary"
      >
        <GoPencil size={30} className="text-white" />
      </div>

      <div className={`w-full mt-[64px] md:mt-0`}>
        <div
          className={`flex items-center bg-slate-200 bg-opacity-40 dark:bg-dark dark:bg-opacity-40 backdrop-blur-sm  gap-7 fixed transition-transform duration-700 top-0 left-0 z-10 w-full md:sticky md:w-auto
         ${!visible ? ' -translate-y-[64px] ' : 'translate-y-0'}
         }
      `}
        >
          <button
            onClick={() => navigate('..')}
            className="p-2 ml-3 rounded-full dark:pointerhover:hover:bg-slate-600 pointerhover:hover:bg-slate-300 bg-opacity-40"
          >
            <AiOutlineArrowLeft size={20} />
          </button>
          <div className="flex flex-col py-3">
            <div className="text-base font-semibold md:text-xl">
              {user?.displayName}
            </div>
            <span className="text-xs text-slate-400">{`${posts.length}件のポスト`}</span>
          </div>
        </div>
        <div className="w-full  relative h-[100px] md:h-[200px] dark:bg-slate-600 bg-slate-300">
          <div className="absolute left-5 -bottom-20">
            <HeaderProfile user={user} toProfile profilePath={true} />
          </div>
          {user?.uid === currentUser?.user?.uid && (
            <button
              onClick={() => setIsProfileEditModalOpen(true)}
              className="absolute px-4 py-2 border rounded-full right-5 -bottom-14 border-slate-600 dark:pointerhover:hover:bg-slate-800 pointerhover:hover:bg-slate-100"
            >
              プロフィールを編集
            </button>
          )}
        </div>
        <div className="mb-24"></div>
        <div className="flex flex-col px-5 mb-10 ">
          <div className="text-base font-semibold md:text-xl">
            {user?.displayName}
          </div>
          <div className="text-sm cursor-pointer text-slate-500">{mention}</div>

          <div className="relative flex gap-4 mt-3 text-sm text-slate-500">
            <div className="cursor-pointer pointerhover:hover:underline">
              <span className="font-bold text-black dark:text-white">7</span>{' '}
              フォロー中
            </div>
            <div className="cursor-pointer pointerhover:hover:underline">
              <span className="font-bold text-black dark:text-white">7</span>{' '}
              フォロワー
            </div>
            {user?.uid === currentUser?.user?.uid && (
              <div
                onClick={async () => {
                  const auth = getAuth(app);
                  await signOut(auth);
                  setIsModalOpen(false);
                  toast.success('ログアウトしました');
                }}
                className="absolute right-0 cursor-pointer w-[100px] -top-5"
              >
                <Button label={`ログアウト`} />
              </div>
            )}
          </div>
        </div>
        <PostNav isProfilePostNav={true} />
        {posts?.length > 0 ? (
          posts.map(post => <PostListItem post={post} key={post?.id} />)
        ) : (
          <div className="flex flex-col gap-4 m-auto mt-3 text-center">
            <p>まだポストがありません</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileInfo;
