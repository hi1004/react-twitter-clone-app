import PostEditForm from '@/components/posts/PostEditForm';
import ModalPortal from '@/components/ui/ModalPortal';
import { editModalState } from '@/store/modal/homeModalAtoms';
import { tagState } from '@/store/posts/postAtoms';
import { CgClose } from 'react-icons/cg';
import { useRecoilState, useSetRecoilState } from 'recoil';

const EditModal = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useRecoilState(editModalState);
  const setTags = useSetRecoilState(tagState);
  return (
    <>
      {isEditModalOpen && (
        <ModalPortal>
          <div
            onClick={e => e.stopPropagation()}
            className="fixed hidden md:block left-1/2  -translate-x-1/2 z-40 rounded-3xl text-black bg-white dark:bg-dark dark:text-white w-[580px] top-36"
          >
            <div
              role="presentation"
              onClick={() => {
                setIsEditModalOpen(false);
                setTags([]);
              }}
              className="flex items-center h-10 gap-12 p-3 m-2 rounded-full cursor-pointer w-max pointerhover:hover:bg-gray-200 dark:pointerhover:hover:bg-gray-600 bg-opacity-20"
            >
              <CgClose />
            </div>
            <PostEditForm />
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default EditModal;
