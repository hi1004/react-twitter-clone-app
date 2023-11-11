import HeaderProfile from '@/components/layout/header/HeaderProfile';
import Button from '@/components/ui/Button';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { addDoc, collection } from '@firebase/firestore';
import React, { FormEvent, useContext, useRef, useState } from 'react';
import { FaFileImage } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PostForm = () => {
  const [content, setContent] = useState<string>('');
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);

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
      });
      setContent('');
      toast.success('Tweetできました');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className="w-full px-6 pt-4 pb-2 border-b dark:border-b-slate-700"
      onSubmit={handlePostSubmit}
    >
      <div className="flex gap-4 ">
        <div className={`flexpl-0 cursor-pointer scale-90 h-fit`}>
          <HeaderProfile user={user} toProfile />
        </div>

        <div className="flex flex-col justify-between w-full">
          <textarea
            ref={textarea}
            className={`w-full text-xl h-auto bg-transparent outline-none resize-none`}
            onChange={handleChange}
            value={content}
            placeholder="いまどうしてる？"
          />
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
