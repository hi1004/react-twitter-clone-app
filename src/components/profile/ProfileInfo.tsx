import { UserProps } from '@/components/follow/FollowingBox';
import HeaderProfile from '@/components/layout/header/HeaderProfile';
import PostListItem from '@/components/posts/PostListItem';
import PostNav from '@/components/posts/PostNav';
import CommentModal from '@/components/posts/modal/CommentModal';
import DeleteModal from '@/components/posts/modal/DeleteModal';
import EditModal from '@/components/posts/modal/EditModal';
import PostModal from '@/components/posts/modal/PostModal';
import Button from '@/components/ui/Button';
import { app, db } from '@/firebaseApp';
import {
  homeModalState,
  imgModalState,
  postModalState,
  profileModalState,
} from '@/store/modal/homeModalAtoms';
import {
  followerIdsState,
  followingIdsState,
  profileTabState,
} from '@/store/modal/profileModalAtoms';
import { PostProps } from '@/store/posts/postAtoms';
import { User, getAuth, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GoPencil } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface ProfileInfoProps {
  currentUser?: User;
}

const ProfileInfo = ({ currentUser }: ProfileInfoProps) => {
  const [activeTab, setActiveTab] = useRecoilState(profileTabState);
  const setIsModalOpen = useSetRecoilState(homeModalState);
  const params = useParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);
  const setIsHidden = useSetRecoilState(imgModalState);
  const setIsPostModalOpen = useSetRecoilState(postModalState);
  const setIsProfileEditModalOpen = useSetRecoilState(profileModalState);
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);
  const [likePosts, setLikePosts] = useState<PostProps[]>([]);
  const [posts, setPosts] = useState<PostProps[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = currentUser ? currentUser : (posts[0] as any);
  const [followingIds, setFollowingIds] =
    useRecoilState<string[]>(followingIdsState);
  const [followerIds, setfollowerIds] =
    useRecoilState<string[]>(followerIdsState);

  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, 'following', user?.uid);
      onSnapshot(ref, doc => {
        setFollowingIds(['']);
        doc
          ?.data()
          ?.users?.map((user: UserProps) =>
            setFollowingIds((prev: string[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [user?.uid]);

  const getFolowerIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, 'follower', user?.uid);
      onSnapshot(ref, doc => {
        setfollowerIds(['']);
        doc
          ?.data()
          ?.users?.map((user: UserProps) =>
            setfollowerIds((prev: string[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      getFollowingIds();
      getFolowerIds();
    }
  }, [getFollowingIds, getFolowerIds, user?.uid]);
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

  useEffect(() => {
    if (user) {
      window.scrollTo(0, 0);
      const postsRef = collection(db, 'posts');

      const myPostQuery = query(
        postsRef,
        where('uid', '==', user?.uid),
        orderBy('createdAt', 'desc')
      );
      const likePostQuery = query(
        postsRef,
        where('likes', 'array-contains', user?.uid),
        orderBy('createdAt', 'desc')
      );

      onSnapshot(myPostQuery, snapShot => {
        const dataObj = snapShot.docs.map(doc => ({
          ...doc.data(),
          id: doc?.id,
        }));

        setMyPosts(dataObj as PostProps[]);
      });

      onSnapshot(likePostQuery, snapShot => {
        const dataObj = snapShot.docs.map(doc => ({
          ...doc.data(),
          id: doc?.id,
        }));

        setLikePosts(dataObj as PostProps[]);
      });
    }
    setActiveTab('my');
  }, [user]);

  const userName = `@
  ${
    !user?.email
      ? user?.displayName?.replace(/[^\w\s]/g, '')?.toLocaleLowerCase()
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
      <CommentModal />

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
         ${!visible ? ' -translate-y-[64px] -mt-[130px]' : 'translate-y-0 mt-0'}
         }
      `}
        >
          <button
            onClick={() => navigate(-1)}
            className="p-2 ml-3 rounded-full dark:pointerhover:hover:bg-slate-600 pointerhover:hover:bg-slate-300 bg-opacity-40"
          >
            <AiOutlineArrowLeft size={20} />
          </button>
          <div className="flex flex-col py-3">
            <div className="text-base font-semibold md:text-xl">
              {user?.displayName}
            </div>
            <span className="text-xs text-slate-400">{`${myPosts.length}件のポスト`}</span>
          </div>
        </div>
        <div className="w-full  relative h-[100px] md:h-[200px] dark:bg-slate-600 bg-slate-300">
          <div className="absolute left-5 -bottom-20">
            <HeaderProfile user={user} toProfile profilePath={true} />
          </div>
          {user?.uid === currentUser?.uid ? (
            <button
              onClick={() => setIsProfileEditModalOpen(true)}
              className="absolute px-4 py-2 border rounded-full right-5 -bottom-14 border-slate-600 dark:pointerhover:hover:bg-slate-800 pointerhover:hover:bg-slate-100"
            >
              プロフィールを編集
            </button>
          ) : (
            <button className="absolute px-4 py-2 border rounded-full cursor-default right-5 -bottom-14 border-slate-600">
              {followerIds.length > 1 ? <p>フォロー中</p> : <p>フォロー</p>}
            </button>
          )}
        </div>
        <div className="mb-24"></div>
        <div className="flex flex-col px-5 mb-10 ">
          <div className="text-base font-semibold md:text-xl">
            {user?.displayName}
          </div>
          <div className="text-sm cursor-pointer text-slate-500">
            {userName}
          </div>

          <div className="relative flex gap-4 mt-3 text-sm text-slate-500">
            <div className="cursor-pointer pointerhover:hover:underline">
              <span className="font-bold text-black dark:text-white">
                {followingIds.length - 1 || 0}
              </span>{' '}
              フォロー中
            </div>
            <div className="cursor-pointer pointerhover:hover:underline">
              <span className="font-bold text-black dark:text-white">
                {followerIds.length - 1 || 0}
              </span>{' '}
              フォロワー
            </div>

            {user?.uid === currentUser?.uid && (
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
        {activeTab === 'my' && (
          <div>
            {posts?.length > 0 ? (
              posts.map(post => (
                <PostListItem post={post} user={user} key={post?.id} />
              ))
            ) : (
              <div className="flex flex-col gap-4 m-auto mt-3 text-center">
                <p>まだポストがありません</p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'like' && (
          <div>
            {likePosts?.length > 0 ? (
              likePosts.map(post => (
                <PostListItem post={post} user={user} key={post?.id} />
              ))
            ) : (
              <div className="flex flex-col gap-4 m-auto mt-3 text-center">
                <p>まだいいねがありません</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileInfo;
