import HeaderProfile from '@/components/layout/header/HeaderProfile';
import HashTagForm from '@/components/posts/HashTagForm';
import Button from '@/components/ui/Button';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db, storage } from '@/firebaseApp';
import { postModalState } from '@/store/modal/homeModalAtoms';
import { hashState, tagState } from '@/store/posts/postAtoms';
import { addDoc, collection } from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { FormEvent, useContext, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFileImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

interface PostFormProps {
  autoFocus?: boolean;
}
const PostForm = ({ autoFocus }: PostFormProps) => {
  const [content, setContent] = useState<string>('');
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const [isPostModalOpen, setIsPostModalOpen] = useRecoilState(postModalState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tags, setTags] = useRecoilState(tagState);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const setHashTag = useSetRecoilState(hashState);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file as Blob);
      fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
        const { result } = e.target as FileReader;
        setImageFile(result as string);
      };
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

  const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    try {
      // 先にイメージアップロード
      let imageUrl = '';
      if (imageFile) {
        const data = await uploadString(storageRef, imageFile, 'data_url');
        imageUrl = await getDownloadURL(data?.ref);
      }

      // アップロードできたイメージのdownload urlアップデート
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
        imageUrl,
      });

      setContent('');
      setTags([]);
      setHashTag('');
      if (textarea.current) textarea.current.style.height = 'auto';
      setIsPostModalOpen(false);
      setImageFile(null);
      setIsSubmitting(false);
      toast.success('Tweetできました');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className={`w-full px-6 pt-4 pb-4 max-h-[740px] overflow-auto ${
        isPostModalOpen ? 'border-none' : 'border-b dark:border-b-slate-700'
      }`}
      onSubmit={handlePostSubmit}
    >
      <div className="flex gap-4 ">
        <div className={`flex pl-0 cursor-pointer scale-90 h-fit`}>
          <HeaderProfile user={user} toProfile />
        </div>

        <div className={`flex flex-col justify-between w-full`}>
          <textarea
            ref={textarea}
            className={`w-full text-xl h-auto bg-transparent max-h-[580px] mb-3  border-none  outline-none resize-none`}
            onChange={handleChange}
            value={content}
            autoFocus={autoFocus}
            placeholder="いまどうしてる？"
          />

          <div className="relative flex items-end justify-between w-full mb-7">
            <div>
              <input
                type="file"
                id="file-input"
                name="file-input"
                accept="image/*, video/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              {imageFile && (
                <div
                  className={`relative max-h-[380px]  overflow-hidden  items-center justify-center flex rounded-xl cursor-pointer`}
                >
                  <img
                    src={imageFile}
                    alt="attchment"
                    className="w-[475px] object-cover"
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
                label="ポストする"
                disabled={!content.trim()?.length || isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
