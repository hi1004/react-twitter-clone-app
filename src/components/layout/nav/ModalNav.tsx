import { UserProps } from '@/components/follow/FollowingBox';
import HeaderProfile from '@/components/layout/header/HeaderProfile';
import MenuNavItem from '@/components/layout/nav/MenuNavItem';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { db } from '@/firebaseApp';
import { homeModalState } from '@/store/modal/homeModalAtoms';
import {
  followerIdsState,
  followingIdsState,
} from '@/store/modal/profileModalAtoms';
import { doc, onSnapshot } from 'firebase/firestore';
import { useCallback, useContext, useEffect } from 'react';
import { useRecoilState } from 'recoil';

const ModalNav = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(homeModalState);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const [followingIds, setFollowingIds] =
    useRecoilState<string[]>(followingIdsState);
  const [followerIds, setfollowerIds] =
    useRecoilState<string[]>(followerIdsState);
  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, 'following', user?.uid);
      onSnapshot(ref, doc => {
        setFollowingIds(['']);
        doc
          ?.data()
          ?.users?.map((user: UserProps) =>
            setFollowingIds((prev: string[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [user?.uid]);

  const getFolowerIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, 'follower', user?.uid);
      onSnapshot(ref, doc => {
        setfollowerIds(['']);
        doc
          ?.data()
          ?.users?.map((user: UserProps) =>
            setfollowerIds((prev: string[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      getFollowingIds();
      getFolowerIds();
    }
  }, [getFollowingIds, getFolowerIds, user?.uid]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };
  const handleMenuListClick = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="md:hidden">
      <div
        role="presentation"
        className={`fixed inset-0 bg-gray-400 bg-opacity-20 transform transition-transform  ${
          isModalOpen ? 'opacity-100 z-10' : 'opacity-0  -z-10'
        }`}
        onClick={handleBackgroundClick}
      >
        <div
          className={`${
            isModalOpen
              ? 'translate-x-0 opacity-100'
              : '-translate-x-full opacity-0'
          } absolute w-4/5 sm:w-3/5 h-screen   inset-0  dark:bg-dark transform transition-transform `}
        >
          <div className="h-full p-4 text-black bg-white dark:bg-dark dark:text-white">
            <HeaderProfile user={user} toProfile />

            <div className="flex flex-col pl-1 mb-7">
              <div className="text-lg font-semibold">{user?.displayName}</div>
              <div className="text-sm text-slate-500">
                @
                {!user?.email
                  ? user?.displayName
                      ?.replace(/[^\w\s]/g, '')
                      ?.toLocaleLowerCase()
                  : user?.email?.replace(/@.*$/, '').toLocaleLowerCase()}
              </div>
              <div className="flex gap-4 mt-3 text-sm text-slate-500">
                <div className="cursor-pointer pointerhover:hover:underline">
                  <span className="font-bold text-black dark:text-white">
                    {followingIds.length - 1 || 0}
                  </span>{' '}
                  フォロー中
                </div>
                <div className="cursor-pointer pointerhover:hover:underline">
                  <span className="font-bold text-black dark:text-white">
                    {followerIds.length - 1 || 0}
                  </span>{' '}
                  フォロワー
                </div>
              </div>
            </div>
            <MenuNavItem
              gridRow="grid-flow-row"
              handleMenuListClick={handleMenuListClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNav;
