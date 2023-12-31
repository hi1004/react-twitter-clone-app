import CommentForm from '@/components/comments/CommentForm';
import CommentList from '@/components/comments/CommentList';
import PostListItem from '@/components/posts/PostListItem';
import DeleteModal from '@/components/posts/modal/DeleteModal';
import EditModal from '@/components/posts/modal/EditModal';
import PostModal from '@/components/posts/modal/PostModal';
import Loader from '@/components/ui/Loader';
import { db } from '@/firebaseApp';
import { editModalState } from '@/store/modal/homeModalAtoms';
import { PostProps, homeResizeState } from '@/store/posts/postAtoms';
import { doc, onSnapshot } from 'firebase/firestore';
import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const PostDetail = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<PostProps | null>(null);
  const isMobileSize = useRecoilValue(homeResizeState);
  const isEditModalOpen = useRecoilValue(editModalState);

  const params = useParams();
  useEffect(() => {
    const getPost = async () => {
      if (params.id) {
        const docRef = doc(db, 'posts', params.id);
        onSnapshot(docRef, doc => {
          setPost({ ...(doc?.data() as PostProps), id: doc?.id });
        });
      }
    };
    window.scrollTo(0, 0);
    if (params.id) {
      getPost();
    }
  }, [params.id, isEditModalOpen]);

  return (
    <div className="md:w-[580px] relative min-h-screen w-full md:border-r dark:md:border-r-slate-700 md:border-r-slate-300">
      <PostModal />
      <EditModal />
      <DeleteModal />
      <div className="flex items-center p-3 gap-14">
        <button
          onClick={() =>
            location.pathname === `/posts/${params.id}` && isMobileSize
              ? navigate('..')
              : navigate(-1)
          }
          className="p-2 rounded-full dark:pointerhover:hover:bg-slate-600 pointerhover:hover:bg-slate-300 bg-opacity-40"
        >
          <AiOutlineArrowLeft size={20} />
        </button>
        <span className="text-xl font-semibold">ポストする</span>
      </div>

      {post ? (
        <>
          <PostListItem post={post} />
          <CommentForm post={post} />
          <DeleteModal />
          {post?.comments
            ?.slice(0)
            ?.reverse()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ?.map((data: any) => (
              <CommentList data={data} key={uniqueId()} post={post} />
            ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostDetail;
