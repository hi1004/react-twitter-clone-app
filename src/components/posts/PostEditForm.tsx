import HeaderProfile from '@/components/layout/header/HeaderProfile';
import HashTagForm from '@/components/posts/HashTagForm';
import Button from '@/components/ui/Button';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db, storage } from '@/firebaseApp';
import { editModalState, imgModalState } from '@/store/modal/homeModalAtoms';
import {
  homeResizeState,
  postDataState,
  postIdState,
  tagState,
} from '@/store/posts/postAtoms';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import React, {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import { FaFileImage } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

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
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const postData = useRecoilValue(postDataState);
  const setIsHidden = useSetRecoilState(imgModalState);

  const getPost = useCallback(async () => {
    if (currentPostId) {
      const docRef = doc(db, 'posts', currentPostId);
      const docSnap = await getDoc(docRef);

      setContent(docSnap?.data()?.content);
      setTags(docSnap?.data()?.hashTags);
      setImageFile(docSnap?.data()?.imageUrl);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const fileReader = new FileReader();

      fileReader.onloadend = async (e: ProgressEvent<FileReader>) => {
        const { result } = e.target as FileReader;
        setImageFile(result as string);

        const storageRef = ref(storage, `${user?.uid}/${uuidv4()}`);
        try {
          const dataUrl = result as string;
          await uploadString(storageRef, dataUrl, 'data_url');
        } catch (error) {
          console.log(error);
        }
      };

      fileReader.readAsDataURL(file as Blob);
    }
  };
  const handleFileDelete = () => {
    setImageFile(null);
  };

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
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);

    try {
      if (postData) {
        let imageUrl = null;

        if (imageFile) {
          const data = await uploadString(storageRef, imageFile, 'data_url');
          imageUrl = await getDownloadURL(data?.ref);
        }

        const postRef = doc(db, 'posts', currentPostId);

        const postToUpdate = {
          content,
          hashTags: tags,
          imageUrl,
          createdAt: new Date()?.toLocaleDateString('ja', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        };

        if (postData?.imageUrl) {
          const imageRef = ref(storage, postData?.imageUrl);
          await deleteObject(imageRef).catch(error => console.log(error));
        }

        await updateDoc(postRef, postToUpdate);
        setIsEditModalOpen(false);
        navigate(`/posts/${currentPostId}`);
      }
      setIsHidden(false);
      setTags([]);
      setImageFile(null);
      setIsSubmitting(false);
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

          <div className={`flex flex-col justify-between w-full `}>
            <textarea
              ref={textarea}
              className={`w-full text-xl bg-transparent outline-none resize-none`}
              onChange={handleChange}
              value={content}
              placeholder="いまどうしてる？"
              autoFocus
            />
            <div className="relative flex items-end justify-between w-full mb-7">
              <div>
                <input
                  type="file"
                  id="file-input"
                  name="file-input"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                {imageFile && (
                  <div className="relative max-h-[680px] items-center justify-center flex overflow-hidden rounded-xl cursor-pointer">
                    <img
                      src={imageFile}
                      alt="attchment"
                      className="w-[475px] max-h-[380px]  overflow-hidden object-cover"
                    />
                    <AiOutlineClose
                      size={30}
                      className="absolute z-10 p-2 text-white bg-black rounded-full top-2 right-2 bg-opacity-70 pointerhover:hover:bg-opacity-100"
                      onClick={handleFileDelete}
                    />
                  </div>
                )}
              </div>
            </div>

            <HashTagForm />

            <div className="flex items-center justify-between">
              <label htmlFor="file-input" className="cursor-pointer">
                <FaFileImage className="text-primary " />
              </label>
              <div className="w-[100px]">
                <Button
                  label="修正する"
                  disabled={!content.trim()?.length || isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostEditForm;
