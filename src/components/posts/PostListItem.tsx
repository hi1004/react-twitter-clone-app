import FollowingBox from '@/components/follow/FollowingBox';
import HeaderProfile from '@/components/layout/header/HeaderProfile';
import AuthContext from '@/context/AuthContext';
import { db, storage } from '@/firebaseApp';
import {
  commentModalState,
  deleteModalState,
  editModalState,
  imgModalState,
} from '@/store/modal/homeModalAtoms';
import {
  PostProps,
  homeResizeState,
  postDataState,
  postIdState,
} from '@/store/posts/postAtoms';
import { User } from 'firebase/auth';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { uniqueId } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  AiFillDelete,
  AiFillHeart,
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
  user?: User;
  onlyContent?: boolean;
}

const PostListItem = ({ post, user, onlyContent }: PostListItemProps) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const setIsEditModalOpen = useSetRecoilState(editModalState);
  const isMobileSize = useRecoilValue(homeResizeState);
  const setCurrentPostId = useSetRecoilState(postIdState);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useRecoilState(deleteModalState);
  const setIsCommentModalOpen = useSetRecoilState(commentModalState);
  const navigate = useNavigate();
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const setPostData = useSetRecoilState(postDataState);
  const imageRef = ref(storage, post?.imageUrl);
  const setIsHidden = useSetRecoilState(imgModalState);
  const currentUser = useContext(AuthContext);
  const MAX_CONTENT_HEIGHT = post?.imageUrl ? 135 : 250;

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current?.scrollHeight;
      if (contentHeight >= MAX_CONTENT_HEIGHT) {
        setIsContentExpanded(true);
      } else {
        setIsContentExpanded(false);
      }
    }
  }, []);

  const handleDelete = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    // storage イメージ削除

    if (post?.imageUrl) {
      deleteObject(imageRef).catch(error => console.log(error));
    }
    if (post?.id) setCurrentPostId(post?.id);
    if (!isDeleteModalOpen) {
      setIsDeleteModalOpen(true);
    }
    setPostData(post);
  };

  const handlePostClick = () => {
    if (post?.id) {
      setCurrentPostId(post?.id);
      const currentLocation = location.pathname;

      if (
        currentLocation === '/' ||
        currentLocation === `/profile/${post.uid}` ||
        currentLocation === '/search'
      )
        navigate(`/posts/${post?.id}`);
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
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference}時間前`;
    }
    return postDate.toLocaleString('ja-JP', {
      month: 'long',
      day: 'numeric',
    });
  };
  const formattedTime = post?.createdAt && getFormattedTime(post?.createdAt);
  const toggleLike = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    if (post?.id) {
      const postRef = doc(db, 'posts', post.id);

      if (
        currentUser?.user?.uid &&
        post?.likes?.includes(currentUser?.user?.uid)
      ) {
        await updateDoc(postRef, {
          likes: arrayRemove(currentUser?.user?.uid),
          likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(currentUser?.user?.uid),
          likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
        });
      }
    }
  };
  return (
    <li
      onClick={handlePostClick}
      className={`flex px-6 pt-2 pb-2 border-b ${
        location.pathname === `/posts/${post?.id}`
          ? 'cursor-default max-h-full'
          : `min-h-[150px] max-h-[750px] cursor-pointer`
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
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <div
              role="presentation"
              onClick={e => {
                e.stopPropagation();
                navigate(`/profile/${post.uid}`);
              }}
              className="font-bold cursor-pointer pointerhover:hover:underline"
            >
              {user?.uid === post?.uid ? user?.displayName : post?.displayName}
            </div>
            <div className="text-sm cursor-pointer text-slate-500">
              @
              {!post?.email
                ? post?.displayName
                    ?.replace(/[^\w\s]/g, '')
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
          {currentUser?.user?.uid !== post?.uid && <FollowingBox post={post} />}
        </div>
        <p
          className={`${
            location.pathname !== `/posts/${post?.id}`
              ? `overflow-hidden  max-h-[250px]`
              : 'max-h-auto'
          } ${
            post?.imageUrl && location.pathname !== `/posts/${post?.id}`
              ? 'max-h-[115px]'
              : 'max-h-auto'
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
        {post?.imageUrl && (
          <div
            className={`overflow-hidden rounded-xl items-center justify-center flex mt-4 mb-2 ${
              location.pathname === `/posts/${post?.id}`
                ? 'max-h-full'
                : 'max-h-[680px]'
            } `}
          >
            <img
              src={post?.imageUrl}
              alt={post?.imageUrl}
              className="w-[475px] object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-6 ">
          {post?.hashTags?.map(tag => (
            <span
              className={`text-sm cursor-pointer text-primary pointerhover:hover:underline`}
              onClick={e => {
                e.stopPropagation();
                navigate(`/search?query=${tag}`);
              }}
              key={uniqueId()}
            >
              #{tag}
            </span>
          ))}
        </div>

        <ul className="flex items-center justify-between mt-1">
          <div className="flex gap-2">
            {!onlyContent && (
              <>
                <li
                  onClick={e => {
                    e.stopPropagation();
                    setIsCommentModalOpen(true);
                    setPostData(post);
                  }}
                  className="flex items-center gap-1 py-3 text-sm cursor-pointer dark:text-slate-300 pointerhover:hover:text-primary "
                >
                  <GoComment className="scale-x-[-1]" />
                  <span>{post.comments?.length || 0}</span>
                </li>

                <li
                  onClick={toggleLike}
                  className="flex items-center gap-1 py-3 text-sm cursor-pointer dark:text-slate-300 pointerhover:hover:text-pink-300 "
                >
                  {currentUser?.user &&
                  post?.likes?.includes(currentUser?.user?.uid) ? (
                    <>
                      <AiFillHeart className="text-pink-300" />
                      <span className="text-pink-300">
                        {' '}
                        {post?.likeCount || 0}
                      </span>
                    </>
                  ) : (
                    <>
                      <AiOutlineHeart />
                      <span> {post?.likeCount || 0}</span>
                    </>
                  )}
                </li>
              </>
            )}
          </div>
          {currentUser?.user?.uid === post?.uid && (
            <div className="flex">
              <li
                onClick={e => {
                  e.stopPropagation();
                  if (post?.id && isMobileSize) {
                    setCurrentPostId(post?.id);
                    navigate(`/posts/edit/${post?.id}`);
                  } else {
                    if (post?.id) setCurrentPostId(post?.id);
                    setIsEditModalOpen(true);
                    setIsHidden(true);
                  }
                  setPostData(post);
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
                <>{isDelete ? <AiFillDelete /> : <AiOutlineDelete />}</>
              </li>
            </div>
          )}
        </ul>
      </div>
    </li>
  );
};

export default PostListItem;
