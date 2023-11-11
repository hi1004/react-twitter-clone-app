import HeaderProfile from '@/components/layout/header/HeaderProfile';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { PostProps } from '@/store/posts/postAtoms';
import { useContext, useState } from 'react';
import {
  AiFillDelete,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineHeart,
  AiTwotoneEdit,
} from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { useNavigate } from 'react-router';

interface PostListItemProps {
  post: PostProps;
}

const PostListItem = ({ post }: PostListItemProps) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate('/posts/:id')}
      className="flex px-6 pt-4 pb-2 border-b cursor-pointer border-b-gray-300 dark:border-b-slate-700 dark:pointerhover:hover:bg-slate-800 pointerhover:hover:bg-gray-100"
    >
      <div
        role="presentation"
        className={`flex gap-2 pl-0 pr-4 scale-90 cursor-pointer h-fit`}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <HeaderProfile user={user} toProfile />
      </div>
      <div className="flex flex-col w-full" role="presentation">
        <div className="flex gap-1">
          <div
            role="presentation"
            onClick={e => {
              e.stopPropagation();
              navigate('/profile');
            }}
            className="font-bold cursor-pointer pointerhover:hover:underline"
          >
            {user?.displayName}
          </div>
          <div className="text-sm cursor-pointer text-slate-500">
            @
            {!user?.email
              ? user?.displayName
                  ?.replace(/[^\w\s]/g, '')
                  ?.match(/\S+\s/)?.[0]
                  ?.toLocaleLowerCase()
              : user?.email?.replace(/@.*$/, '').toLocaleLowerCase()}
            ・
            <span
              className=" pointerhover:hover:underline"
              role="presentation"
              onClick={e => {
                e.stopPropagation();
                navigate('/posts/:id');
              }}
            >
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
        <p>{post?.content}</p>
        <ul className="flex items-center justify-between mt-1">
          <div className="flex gap-2">
            <li
              onClick={e => {
                e.stopPropagation();
              }}
              className="flex items-center gap-1 py-3 text-sm dark:text-slate-300 pointerhover:hover:text-primary "
            >
              <GoComment className="scale-x-[-1]" />
              <span> 10</span>
            </li>
            <li
              onClick={e => {
                e.stopPropagation();
              }}
              className="flex items-center gap-1 py-3 text-sm dark:text-slate-300 pointerhover:hover:text-pink-300 "
            >
              <AiOutlineHeart />
              <span> 10</span>
            </li>
          </div>
          {user?.uid === post?.uid && (
            <div className="flex">
              <li
                onClick={e => {
                  e.stopPropagation();
                }}
                onMouseEnter={() => setIsEdit(true)}
                onMouseLeave={() => setIsEdit(false)}
                className={`flex font-bold items-center gap-1 text-green-600 dark:text-emerald-400 pointerhover:hover:text-green-600 p-3 dark:pointerhover:hover:bg-gray-700 pointerhover:hover:bg-gray-300 bg-opacity-30 dark:bg-opacity-30 rounded-[50%] ${
                  isEdit && 'text-green-600'
                }`}
              >
                {isEdit ? <AiTwotoneEdit /> : <AiOutlineEdit />}
              </li>
              <li
                onClick={e => {
                  e.stopPropagation();
                }}
                onMouseEnter={() => setIsDelete(true)}
                onMouseLeave={() => setIsDelete(false)}
                className={`flex font-bold items-center gap-1 text-red-600 pointerhover:hover:text-red-600 p-3 dark:pointerhover:hover:bg-gray-700  pointerhover:hover:bg-gray-300 bg-opacity-30 dark:bg-opacity-30 rounded-[50%] ${
                  isDelete && 'text-red-600'
                }`}
              >
                {isDelete ? <AiFillDelete /> : <AiOutlineDelete />}
              </li>
            </div>
          )}
        </ul>
      </div>
    </li>
  );
};

export default PostListItem;
