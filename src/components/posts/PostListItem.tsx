import HeaderProfile from '@/components/layout/header/HeaderProfile';
import DeleteModal from '@/components/posts/modal/DeleteModal';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { deleteModalState, editModalState } from '@/store/modal/homeModalAtoms';
import {
  PostProps,
  homeResizeState,
  postIdState,
} from '@/store/posts/postAtoms';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  AiFillDelete,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineHeart,
  AiTwotoneEdit,
} from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

interface PostListItemProps {
  post: PostProps;
}
const MAX_CONTENT_HEIGHT = 450;

const PostListItem = ({ post }: PostListItemProps) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const setIsEditModalOpen = useSetRecoilState(editModalState);
  const isMobileSize = useRecoilValue(homeResizeState);
  const setCurrentPostId = useSetRecoilState(postIdState);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useRecoilState(deleteModalState);
  const loggedInUser = useContext(AuthContext as React.Context<AuthProps>)
    ?.user;
  const navigate = useNavigate();
  const contentRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current?.clientHeight;

      if (contentHeight > MAX_CONTENT_HEIGHT) {
        setIsContentExpanded(true);
      } else {
        setIsContentExpanded(false);
      }
    }
  }, []);

  const handleDelete = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    if (!isDeleteModalOpen) {
      setIsDeleteModalOpen(true);
    }
  };

  const getFormattedTime = (createdAt: string) => {
    const currentDate = new Date();
    const postDate = new Date(createdAt);

    const timeDifference = currentDate.getTime() - postDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);

    if (minutesDifference === 0) {
      return '現在';
    }
    if (minutesDifference < 60) {
      return `${minutesDifference}分前`;
    }
    if (minutesDifference < 1440) {
      // 一日（２４時間*６０分）
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference}時間前`;
    } else {
      return postDate.toLocaleString('ja-JP', {
        month: 'long',
        day: 'numeric',
      });
    }
  };

  const formattedTime = post?.createdAt && getFormattedTime(post?.createdAt);

  return (
    <li
      onClick={() => {
        if (post?.id) {
          setCurrentPostId(post?.id);
          navigate(`/posts/${post?.id}`);
        }
      }}
      className={`flex px-6 pt-4 pb-2 border-b ${
        location.pathname === `/posts/${post?.uid}`
          ? 'cursor-default max-h-full'
          : 'max-h-[600px] min-h-[150px]  cursor-pointer'
      } border-b-gray-300 dark:border-b-slate-700 dark:pointerhover:hover:bg-slate-800 pointerhover:hover:bg-gray-100`}
    >
      <div
        role="presentation"
        className={`flex gap-2 pl-0 pr-4 scale-90 cursor-pointer h-fit`}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <HeaderProfile user={post} toProfile />
      </div>

      <div className="flex flex-col justify-between w-full" role="presentation">
        <div className="flex gap-1">
          <div
            role="presentation"
            onClick={e => {
              e.stopPropagation();
              navigate(`/profile/${post.uid}`);
            }}
            className="font-bold cursor-pointer pointerhover:hover:underline"
          >
            {post?.displayName}
          </div>
          <div className="text-sm cursor-pointer text-slate-500">
            @
            {!post?.email
              ? post?.displayName
                  ?.replace(/[^\w\s]/g, '')
                  ?.match(/\S+\s/)?.[0]
                  ?.toLocaleLowerCase()
              : post?.email?.replace(/@.*$/, '').toLocaleLowerCase()}
            ・
            <span
              className=" pointerhover:hover:underline"
              role="presentation"
              onClick={e => {
                e.stopPropagation();
                navigate(`/posts/${post?.id}`);
              }}
            >
              {formattedTime}
            </span>
          </div>
        </div>
        <p
          className={`${
            location.pathname !== `/posts/${post?.id}` && 'overflow-hidden'
          }`}
          ref={contentRef}
        >
          {post?.content &&
            post?.content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </p>

        {post?.content && isContentExpanded && (
          <button
            onClick={() => navigate(`/posts/${post?.id}`)}
            className="text-sm text-left cursor-pointer pointerhover:hover:underline w-max text-primary"
          >
            {location.pathname === `/` && 'さらに表示'}
          </button>
        )}

        <ul className="flex items-center justify-between mt-1">
          <div className="flex gap-2">
            <li
              onClick={e => {
                e.stopPropagation();
              }}
              className="flex items-center gap-1 py-3 text-sm cursor-pointer dark:text-slate-300 pointerhover:hover:text-primary "
            >
              <GoComment className="scale-x-[-1]" />
              <span> 10</span>
            </li>
            <li
              onClick={e => {
                e.stopPropagation();
              }}
              className="flex items-center gap-1 py-3 text-sm cursor-pointer dark:text-slate-300 pointerhover:hover:text-pink-300 "
            >
              <AiOutlineHeart />
              <span> 10</span>
            </li>
          </div>
          {loggedInUser?.uid === post?.uid && (
            <div className="flex">
              <li
                onClick={e => {
                  e.stopPropagation();
                  if (isMobileSize) {
                    if (post?.id) setCurrentPostId(post?.id);
                    navigate(`/posts/edit/${post?.id}`);
                  } else {
                    if (post?.id) setCurrentPostId(post?.id);
                    setIsEditModalOpen(true);
                  }
                }}
                onMouseEnter={() => setIsEdit(true)}
                onMouseLeave={() => setIsEdit(false)}
                className={`flex font-bold cursor-pointer items-center gap-1 text-green-600 dark:text-emerald-400 pointerhover:hover:text-green-600 p-3 dark:pointerhover:hover:bg-gray-700 pointerhover:hover:bg-gray-300 bg-opacity-30 dark:bg-opacity-30 rounded-[50%] ${
                  isEdit && 'text-green-600'
                }`}
              >
                {isEdit ? <AiTwotoneEdit /> : <AiOutlineEdit />}
              </li>
              <li
                onClick={handleDelete}
                onMouseEnter={() => setIsDelete(true)}
                onMouseLeave={() => setIsDelete(false)}
                className={`flex font-bold items-center cursor-pointer gap-1 text-red-500 pointerhover:hover:text-red-500 p-3 dark:pointerhover:hover:bg-gray-700  pointerhover:hover:bg-gray-300 bg-opacity-30 dark:bg-opacity-30 rounded-[50%] ${
                  isDelete && 'text-red-600'
                }`}
              >
                <>
                  {isDelete ? <AiFillDelete /> : <AiOutlineDelete />}
                  <DeleteModal postId={post?.id} />
                </>
              </li>
            </div>
          )}
        </ul>
      </div>
    </li>
  );
};

export default PostListItem;
