import Button from '@/components/ui/Button';
import ModalPortal from '@/components/ui/ModalPortal';
import { db } from '@/firebaseApp';
import { deleteModalState } from '@/store/modal/homeModalAtoms';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

interface DeleteModal {
  postId?: string;
}

const DeleteModal = ({ postId }: DeleteModal) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useRecoilState(deleteModalState);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (isDeleteModalOpen) {
      await deleteDoc(doc(db, 'posts', postId as string));

      setIsDeleteModalOpen(false);
      navigate('/');
    }
  };
  return (
    <>
      {isDeleteModalOpen && (
        <>
          <ModalPortal>
            <div
              onClick={e => e.stopPropagation()}
              className="flex flex-col gap-6 fixed top-1/2 -translate-y-1/2 p-10 left-1/2 dark:bg-slate-800 bg-white text-black  dark:text-white -translate-x-1/2 z-40 rounded-3xl  w-[400px]"
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">
                  ポストを削除しますか？
                </h3>
                <p className="text-sm dark:text-slate-300 text-slate-600">
                  この操作は取り消せません。プロフィール、あなたをフォローしているアカウントのタイムライン、検索結果からポストが削除されます。{' '}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  label="削除"
                  bgcolor="bg-red-600"
                  borderColor="border-red-600"
                  onClick={handleDelete}
                />
                <Button
                  label="キャンセル"
                  outline
                  bgcolor="bg-transparent"
                  borderColor="border-gray-400"
                  onClick={() => setIsDeleteModalOpen(false)}
                />
              </div>
            </div>
          </ModalPortal>
        </>
      )}
    </>
  );
};

export default DeleteModal;