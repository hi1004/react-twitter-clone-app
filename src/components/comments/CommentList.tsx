import HeaderProfile from '@/components/layout/header/HeaderProfile';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { PostProps } from '@/store/posts/postAtoms';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

export interface CommentProps {
  comment: string;
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: string;
}

interface CommentListProps {
  data: CommentProps;
  post: PostProps;
}

const getFormattedTime = (createdAt: string) => {
  const currentDate = new Date();
  const postDate = new Date(createdAt);

  const timeDifference = currentDate.getTime() - postDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);

  if (minutesDifference === 0) {
    return '1秒';
  }
  if (minutesDifference < 60) {
    return `${minutesDifference}分前`;
  }
  if (minutesDifference < 1440) {
    const hoursDifference = Math.floor(minutesDifference / 60);
    return `${hoursDifference}時間前`;
  }
  return postDate.toLocaleString('ja-JP', {
    month: 'long',
    day: 'numeric',
  });
};

const CommentList = ({ data, post }: CommentListProps) => {
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const handleDeleteComment = async () => {
    if (post && post.id) {
      try {
        const postRef = doc(db, 'posts', post?.id);
        await updateDoc(postRef, {
          comments: arrayRemove(data),
        });
        toast.success('コメントを削除しました');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formattedTime = data?.createdAt && getFormattedTime(data?.createdAt);
  return (
    <div className="border-b border-slate-700">
      <div className="flex py-4 pl-6 pr-8 gap-x-5">
        <HeaderProfile user={data} toProfile />
        <div className="flex flex-col w-full">
          <div className="flex gap-2">
            <div className="font-bold">{data?.displayName}</div>
            <div className="text-sm text-slate-400">
              {data?.email}・{formattedTime}
            </div>
          </div>
          <div className="pb-4">{data?.comment}</div>
          {data?.uid === user?.uid && (
            <div
              onClick={handleDeleteComment}
              className="flex w-max ml-auto font-bold items-center cursor-pointer gap-1 text-red-500 pointerhover:hover:text-red-500 p-3 dark:pointerhover:hover:bg-gray-700  pointerhover:hover:bg-gray-300 bg-opacity-30 dark:bg-opacity-30 rounded-[50%]"
            >
              <AiOutlineDelete />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
