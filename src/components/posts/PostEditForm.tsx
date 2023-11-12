import HeaderProfile from '@/components/layout/header/HeaderProfile';
import Button from '@/components/ui/Button';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { postState } from '@/store/posts/postAtoms';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import React, {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaFileImage } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

const PostEditForm = () => {
  const [posts, setPosts] = useRecoilState(postState);
  const [content, setContent] = useState<string>('');
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, 'posts', params.id);
      const docSnap = await getDoc(docRef);
      setPosts({ id: docSnap?.id, ...docSnap?.data() });

      setContent(docSnap?.data()?.content);
    }
  }, [params.id]);

  useEffect(() => {
    if (params?.id) getPost();
  }, [getPost]);

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
      if (posts) {
        const postRef = doc(db, 'posts', posts?.id);
        await updateDoc(postRef, {
          content,
        });
        navigate(`/posts/${posts?.id}`);
      }

      toast.success('Tweetを修正しました');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className="w-full px-6 pt-4 pb-2 border-b dark:border-b-slate-700"
      onSubmit={handlePostEditSubmit}
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
              <Button label="修正する" disabled={!content.trim()?.length} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostEditForm;
