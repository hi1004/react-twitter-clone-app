import CommentForm from '@/components/comments/commentForm';
import PostListItem from '@/components/posts/PostListItem';
import ModalPortal from '@/components/ui/ModalPortal';
import { commentModalState } from '@/store/modal/homeModalAtoms';
import { homeResizeState, postDataState } from '@/store/posts/postAtoms';
import { CgClose } from 'react-icons/cg';
import { useRecoilState, useRecoilValue } from 'recoil';

const CommentModal = () => {
  const [isCommentModalOpen, setIsCommentModalOpen] =
    useRecoilState(commentModalState);
  const isMobileSize = useRecoilValue(homeResizeState);
  const postData = useRecoilValue(postDataState);

  return (
    <>
      {isCommentModalOpen && (
        <ModalPortal>
          <div
            onClick={e => e.stopPropagation()}
            className={`fixed  md:block ${
              isMobileSize
                ? 'flex flex-col w-full h-full top-0 left-0'
                : 'top-36 rounded-3xl  max-h-[780px] overflow-auto'
            } left-1/2  -translate-x-1/2 z-40 text-black bg-white dark:bg-dark dark:text-white w-[580px] `}
          >
            <div
              role="presentation"
              onClick={() => {
                setIsCommentModalOpen(false);
              }}
              className="flex items-center h-10 p-3 m-2 rounded-full cursor-pointer w-max pointerhover:hover:bg-gray-200 dark:pointerhover:hover:bg-gray-600 bg-opacity-20"
            >
              <CgClose />
            </div>
            <PostListItem post={postData} onlyContent={true} />
            <CommentForm post={postData} />
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default CommentModal;
