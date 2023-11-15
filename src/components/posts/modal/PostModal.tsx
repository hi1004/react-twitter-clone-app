import PostForm from '@/components/posts/PostForm';
import Loader from '@/components/ui/Loader';
import { postModalState } from '@/store/modal/homeModalAtoms';
import { Suspense } from 'react';
import { CgClose } from 'react-icons/cg';
import { useRecoilState } from 'recoil';

const PostModal = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useRecoilState(postModalState);

  return (
    <>
      {isPostModalOpen && (
        <Suspense fallback={<Loader />}>
          <div
            className="fixed top-0 left-0 z-30 w-full h-full bg-slate-800 bg-opacity-70"
            onClick={e => {
              e.stopPropagation();
              setIsPostModalOpen(false);
            }}
          ></div>
          <div className="fixed  left-1/2  -translate-x-1/2 z-30 rounded-3xl dark:bg-black bg-white w-[580px] top-36">
            <div
              role="presentation"
              onClick={() => {
                setIsPostModalOpen(false);
              }}
              className="flex items-center h-10 p-3 rounded-full cursor-pointer w-max pointerhover:hover:bg-gray-200 dark:pointerhover:hover:bg-gray-600 bg-opacity-20"
            >
              <CgClose />
            </div>
            <PostForm autoFocus />
          </div>
        </Suspense>
      )}
    </>
  );
};

export default PostModal;
