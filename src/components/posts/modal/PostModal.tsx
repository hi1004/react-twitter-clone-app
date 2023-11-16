import PostForm from '@/components/posts/PostForm';
import ModalPortal from '@/components/ui/ModalPortal';
import { postModalState } from '@/store/modal/homeModalAtoms';
import { CgClose } from 'react-icons/cg';
import { useRecoilState } from 'recoil';

const PostModal = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useRecoilState(postModalState);

  return (
    <>
      {isPostModalOpen && (
        <ModalPortal>
          <div
            onClick={e => e.stopPropagation()}
            className="fixed hidden md:block left-1/2  -translate-x-1/2 z-40 rounded-3xl text-black bg-white dark:bg-slate-800 dark:text-white w-[580px] top-36"
          >
            <div
              role="presentation"
              onClick={() => {
                setIsPostModalOpen(false);
              }}
              className="flex items-center h-10 p-3 m-2 rounded-full cursor-pointer w-max pointerhover:hover:bg-gray-200 dark:pointerhover:hover:bg-gray-600 bg-opacity-20"
            >
              <CgClose />
            </div>
            <PostForm autoFocus />
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default PostModal;
