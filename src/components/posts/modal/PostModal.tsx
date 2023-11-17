import PostForm from '@/components/posts/PostForm';
import ModalPortal from '@/components/ui/ModalPortal';
import { postModalState } from '@/store/modal/homeModalAtoms';
import { homeResizeState } from '@/store/posts/postAtoms';
import { CgClose } from 'react-icons/cg';
import { useRecoilState, useRecoilValue } from 'recoil';

const PostModal = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useRecoilState(postModalState);
  const isMobileSize = useRecoilValue(homeResizeState);

  return (
    <>
      {isPostModalOpen && (
        <ModalPortal>
          <div
            onClick={e => e.stopPropagation()}
            className={`fixed  md:block ${
              isMobileSize
                ? 'flex flex-col w-full h-full top-0 left-0'
                : 'top-36 rounded-3xl'
            } left-1/2  -translate-x-1/2 z-40 text-black bg-white dark:bg-dark dark:text-white w-[580px] `}
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
