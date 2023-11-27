import HeaderProfile from '@/components/layout/header/HeaderProfile';
import Button from '@/components/ui/Button';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { commentModalState } from '@/store/modal/homeModalAtoms';
import { PostProps } from '@/store/posts/postAtoms';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

export interface CommentFormProps {
  post: PostProps | null;
}
const CommentForm = ({ post }: CommentFormProps) => {
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const setIsCommentModalOpen = useSetRecoilState(commentModalState);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    if (textarea.current) {
      setComment(value);
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
    if (name === 'comment') {
      setComment(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (post?.id && user) {
      try {
        const postRef = doc(db, 'posts', post?.id);
        const commentObj = {
          comment,
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          email: `@${
            !user?.email
              ? user?.displayName?.replace(/[^\w\s]/g, '')?.toLocaleLowerCase()
              : user?.email?.replace(/@.*$/, '').toLocaleLowerCase()
          }`,
          createdAt: new Date()?.toLocaleDateString('ja', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        };
        await updateDoc(postRef, {
          comments: arrayUnion(commentObj),
        });
        setIsSubmitting(false);
        if (textarea.current) {
          textarea.current.style.height = 'auto';
        }

        toast.success('コメントを作成しました');
        setIsCommentModalOpen(false);
        setComment('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative border-b border-b-slate-700">
        <p className="py-4 pl-20 text-sm text-slate-500">
          返信先:{' '}
          <span className="text-primary">
            @
            {!post?.email
              ? post?.displayName?.replace(/[^\w\s]/g, '')?.toLocaleLowerCase()
              : post?.email?.replace(/@.*$/, '').toLocaleLowerCase()}
          </span>
          さん
        </p>
        <div className="absolute top-12 left-6">
          <HeaderProfile user={user} toProfile />
        </div>
        <textarea
          ref={textarea}
          name={comment}
          className={`w-full pr-8 pl-20 pb-20 text-xl h-auto bg-transparent max-h-[580px] min-h-[152px] mb-3  border-none  outline-none resize-none`}
          onChange={handleChange}
          value={comment}
          placeholder="返信をポスト"
        />
        <div className="absolute w-[100px] bottom-4 right-4 ">
          <Button
            label="返信"
            disabled={!comment.trim()?.length || isSubmitting}
          />
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
