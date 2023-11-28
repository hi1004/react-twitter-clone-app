import AuthContext from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { PostProps } from '@/store/posts/postAtoms';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { CgMoreAlt } from 'react-icons/cg';
import { toast } from 'react-toastify';

interface FollowingBoxProps {
  post: PostProps;
}

export interface UserProps {
  id: string;
}

const FollowingBox = ({ post }: FollowingBoxProps) => {
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useContext<any>(AuthContext);
  const [postFollowers, setPostFollowers] = useState<UserProps[]>([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const closeMoreOpen = (e: any) => {
      const target = e.target;
      if (!target.closest('.more-modal')) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('click', closeMoreOpen);

    return () => {
      document.removeEventListener('click', closeMoreOpen);
    };
  }, [setIsMoreOpen]);

  const getFollowers = useCallback(async () => {
    if (post.uid) {
      const ref = doc(db, 'follower', post.uid);
      onSnapshot(ref, doc => {
        setPostFollowers([]);
        doc?.data()?.users?.map((user: UserProps) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setPostFollowers((prev: any) => (prev ? [...prev, user?.id] : []))
        );
      });
    }
  }, [post.uid]);
  useEffect(() => {
    if (post.uid) getFollowers();
  }, [getFollowers, post.uid]);

  const userName = `@${
    !post?.email
      ? post?.displayName?.replace(/[^\w\s]/g, '')?.toLocaleLowerCase()
      : post?.email?.replace(/@.*$/, '').toLocaleLowerCase()
  }`;

  const handleClickOpenMore = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsMoreOpen(prev => !prev);
  };
  const handleClickFollow = async (
    e: React.MouseEvent<HTMLParagraphElement>
  ) => {
    e.preventDefault();

    try {
      if (post?.uid && user?.uid) {
        const followingRef = doc(db, 'following', user?.uid);
        await setDoc(
          followingRef,
          {
            users: arrayUnion({ id: post?.uid }),
          },
          { merge: true }
        );

        const followerRef = doc(db, 'follower', post?.uid);
        await setDoc(
          followerRef,
          {
            users: arrayUnion({ id: user?.uid }),
          },
          { merge: true }
        );
      }
      toast.success(`${userName}さんをフォローしました`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFollow = async (
    e: React.MouseEvent<HTMLParagraphElement>
  ) => {
    e.preventDefault();
    try {
      if (post?.uid && user?.uid) {
        const followingRef = doc(db, 'following', user?.uid);
        await updateDoc(followingRef, {
          users: arrayRemove({ id: post.uid }),
        });
        const followerRef = doc(db, 'follower', post?.uid);
        await updateDoc(followerRef, {
          users: arrayRemove({ id: user.uid }),
        });
      }
      await addDoc(collection(db, 'notifications'), {
        createdAt: new Date()?.toLocaleDateString('ja', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        content: `${
          user?.email?.replace(/@.*$/, '').toLocaleLowerCase() ||
          user?.displayName?.replace(/[^\w\s]/g, '')?.toLocaleLowerCase()
        }さんが「フォロー」しました。`,
        url: `/profile/${post?.uid}`,
        isRead: false,
        uid: post?.uid,
        toProfile: user?.uid,
        photoURL: user?.photoURL,
        displayName:
          user?.email?.replace(/@.*$/, '').toLocaleLowerCase() ||
          user?.displayName?.replace(/[^\w\s]/g, '')?.toLocaleLowerCase(),
      });

      toast.success(`${userName}さんのフォローを削除しました`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`relative more-modal cursor-default`}
      onClick={handleClickOpenMore}
    >
      <div className="p-2 rounded-full cursor-pointer pointerhover:hover:text-primary w-max pointerhover:hover:bg-primary pointerhover:hover:bg-opacity-10">
        <CgMoreAlt />
      </div>
      {isMoreOpen && (
        <div className="absolute cursor-pointer w-max px-4 py-2 rounded-2xl font-bold text-sm h-100px -left-[220px] top-0 bg-slate-200 dark:bg-slate-800">
          {postFollowers?.includes(user?.uid) ? (
            <p
              onClick={handleDeleteFollow}
              className="flex items-center gap-2 p-2 text-red-500 dark:pointerhover:hover:bg-slate-700 pointerhover:hover:bg-slate-400 rounded-2xl"
            >
              <AiOutlineUserDelete className="text-[20px]" />
              <span>
                {userName}
                さんのフォローを削除
              </span>
            </p>
          ) : (
            <p
              onClick={handleClickFollow}
              className="flex items-center gap-2 p-2 pointerhover:hover:bg-slate-500 rounded-2xl"
            >
              <AiOutlineUserAdd className="text-[20px]" />
              <span>
                {userName}
                さんをフォロー
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowingBox;
