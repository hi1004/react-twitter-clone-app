import HeaderProfile from '@/components/layout/header/HeaderProfile';
import HashTagForm from '@/components/posts/HashTagForm';
import Button from '@/components/ui/Button';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { editModalState } from '@/store/modal/homeModalAtoms';
import {
  homeResizeState,
  postIdState,
  tagState,
} from '@/store/posts/postAtoms';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import React, {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FaFileImage } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const PostEditForm = () => {
  const [content, setContent] = useState<string>('');
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const navigate = useNavigate();
  const isEditModalOpen = useRecoilValue(editModalState);
  const isMobileSize = useRecoilValue(homeResizeState);
  const currentPostId = useRecoilValue(postIdState);
  const setIsEditModalOpen = useSetRecoilState(editModalState);
  const [tags, setTags] = useRecoilState(tagState);
  const getPost = useCallback(async () => {
    if (currentPostId) {
      const docRef = doc(db, 'posts', currentPostId);
      const docSnap = await getDoc(docRef);

      setContent(docSnap?.data()?.content);
      setTags(docSnap?.data()?.hashTags);
    }
  }, [currentPostId]);

  useEffect(() => {
    if (currentPostId) {
      getPost();
    }
  }, [getPost]);
  useEffect(() => {
    if (!isMobileSize) {
      navigate('/');
    }
  }, [isMobileSize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    if (textarea.current) {
      setContent(value);
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  const handlePostEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (currentPostId) {
        const postRef = doc(db, 'posts', currentPostId);
        await updateDoc(postRef, {
          content,
          hashTags: tags,
          createdAt: new Date()?.toLocaleDateString('ja', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        });
        setIsEditModalOpen(false);
        navigate(`/posts/${currentPostId}`);
      }
      setTags([]);
      toast.success('Tweetを修正しました');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form
        className={`w-full px-6 pt-4 pb-4 ${
          isEditModalOpen ? ' border-none' : 'border-b dark:border-b-slate-700'
        } `}
        onSubmit={handlePostEditSubmit}
      >
        {isMobileSize && (
          <div className="flex items-center p-3 gap-14">
            <button
              onClick={() => {
                navigate('..');
                setTags([]);
              }}
              className="p-2 rounded-full dark:pointerhover:hover:bg-slate-600 pointerhover:hover:bg-slate-300 bg-opacity-40"
            >
              <AiOutlineArrowLeft size={20} />
            </button>
            <span className="text-xl font-semibold">ポストする</span>
          </div>
        )}

        <div className="flex gap-4 ">
          <div className={`flex pl-0 cursor-pointer scale-90 h-fit`}>
            <HeaderProfile user={user} toProfile />
          </div>

          <div
            className={`flex flex-col justify-between w-full ${
              isEditModalOpen && 'min-h-[200px] h-full'
            }`}
          >
            <textarea
              ref={textarea}
              className={`w-full text-xl h-auto bg-transparent outline-none  min-h-[480px]  resize-none`}
              onChange={handleChange}
              value={content}
              placeholder="いまどうしてる？"
              autoFocus
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
                <Button label="修正する" disabled={!content.trim()?.length} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostEditForm;
