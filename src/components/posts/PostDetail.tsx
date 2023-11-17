import PostListItem from '@/components/posts/PostListItem';
import EditModal from '@/components/posts/modal/EditModal';
import PostModal from '@/components/posts/modal/PostModal';
import Loader from '@/components/ui/Loader';
import { db } from '@/firebaseApp';
import { PostProps, postIdState } from '@/store/posts/postAtoms';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const PostDetail = () => {
  const navigate = useNavigate();
  const currentPostId = useRecoilValue(postIdState);
  const [post, setPost] = useState<PostProps | null>(null);

  useEffect(() => {
    const getPost = async () => {
      if (currentPostId) {
        const docRef = doc(db, 'posts', currentPostId);
        const docSnap = await getDoc(docRef);
        setPost({ ...docSnap?.data(), id: docSnap?.id });
      }
    };
    window.scrollTo(0, 0);
    if (currentPostId) {
      getPost();
    }
  }, [currentPostId]);

  return (
    <div className="md:w-[580px] relative min-h-screen w-full md:border-r dark:md:border-r-slate-700 md:border-r-slate-300">
      <PostModal />
      <EditModal />

      <div className="flex items-center p-3 gap-14">
        <button
          onClick={() => navigate('..')}
          className="p-2 rounded-full dark:pointerhover:hover:bg-slate-600 pointerhover:hover:bg-slate-300 bg-opacity-40"
        >
          <AiOutlineArrowLeft size={20} />
        </button>
        <span className="text-xl font-semibold">ポストする</span>
      </div>
      {post ? <PostListItem post={post} /> : <Loader />}
    </div>
  );
};

export default PostDetail;
