import HeaderProfile from '@/components/layout/header/HeaderProfile';
import HashTagForm from '@/components/posts/HashTagForm';
import Button from '@/components/ui/Button';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { postModalState } from '@/store/modal/homeModalAtoms';
import { hashState, tagState } from '@/store/posts/postAtoms';
import { addDoc, collection } from '@firebase/firestore';
import React, { FormEvent, useContext, useRef, useState } from 'react';
import { FaFileImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface PostFormProps {
  autoFocus?: boolean;
}
const PostForm = ({ autoFocus }: PostFormProps) => {
  const [content, setContent] = useState<string>('');
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const [isPostModalOpen, setIsPostModalOpen] = useRecoilState(postModalState);
  const [tags, setTags] = useRecoilState(tagState);
  const setHashTag = useSetRecoilState(hashState);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    if (textarea.current) {
      setContent(value);
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'posts'), {
        content,
        createdAt: new Date()?.toLocaleDateString('ja', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        uid: user?.uid,
        email: user?.email,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
        hashTags: tags,
      });

      setContent('');
      setTags([]);
      setHashTag('');
      if (textarea.current) textarea.current.style.height = 'auto';
      setIsPostModalOpen(false);
      toast.success('Tweetできました');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className={`w-full px-6 pt-4 pb-4 ${
        isPostModalOpen ? 'border-none' : 'border-b dark:border-b-slate-700'
      }`}
      onSubmit={handlePostSubmit}
    >
      <div className="flex gap-4 ">
        <div className={`flex pl-0 cursor-pointer scale-90 h-fit`}>
          <HeaderProfile user={user} toProfile />
        </div>

        <div
          className={`flex flex-col  ${
            isPostModalOpen && 'min-h-[200px] '
          }  justify-between w-full`}
        >
          <textarea
            ref={textarea}
            className={`w-full text-xl h-auto bg-transparent max-h-[580px] mb-3  border-none outline-none resize-none`}
            onChange={handleChange}
            value={content}
            autoFocus={autoFocus}
            placeholder="いまどうしてる？"
          />
          <HashTagForm />
          <div className="flex items-center justify-between mt-1">
            <div className="">
              <label htmlFor="file-input" className="cursor-pointer">
                <FaFileImage className="text-primary " />
              </label>
              <input
                type="file"
                id="file-input"
                name="file-input"
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="w-[100px]">
              <Button label="ポストする" disabled={!content.trim()?.length} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
