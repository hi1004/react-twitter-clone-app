import HeaderProfile from '@/components/layout/header/HeaderProfile';
import Toggle from '@/components/ui/Toggle';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { homeModalState } from '@/store/Nav/homeModalAtoms';
import { useContext } from 'react';
import { AiOutlineHome, AiOutlineSearch, AiTwotoneHome } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import { IoIosNotifications, IoMdNotificationsOutline } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

interface MenuNavItemProps {
  gridRow?: string;
  handleMenuListClick?: () => void;
}

const MenuNavItem = ({ gridRow, handleMenuListClick }: MenuNavItemProps) => {
  const isModalOpen = useRecoilValue(homeModalState);
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ul
      className={`${
        isModalOpen
          ? gridRow
          : 'border-t dark:border-t-slate-700 border-r-slate-300 grid-flow-col col-span-3'
      } md:flex md:flex-col md:items-center xl:items-start grid xl:w-[280px] md:w-auto md:h-screen md:border-r dark:md:border-r-slate-700 md:border-r-slate-300`}
    >
      <div
        className={`${
          isModalOpen ? gridRow : ' grid-flow-col col-span-3'
        } md:flex md:flex-col grid xl:w-[280px] md:w-auto md:p-3 md:h-screen`}
      >
        <li className="h-[70px] hidden md:flex items-center">
          <Link
            to="/"
            className="items-center hidden w-min py-2 dark:pointerhover:hover:bg-gray-700 pointerhover:hover:bg-gray-300 bg-opacity-30 rounded-none md:rounded-[9999px] lg:min-w-min md:flex md:justify-center lg:justify-start md:p-3"
          >
            <RiTwitterXLine size={30} className="dark:text-white" />
          </Link>
        </li>
        <li
          className={`${
            isModalOpen ? 'justify-normal' : 'justify-center'
          } flex  py-2 md:justify-normal`}
          onClick={handleMenuListClick}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-4 xl:pr-6 p-3 pointerhover:hover:font-bold pointerhover:hover:bg-gray-300 dark:pointerhover:hover:bg-gray-700 bg-opacity-30 rounded-[9999px] w-max ${
                isActive && 'font-bold bg-gray-300 dark:bg-gray-700'
              }`
            }
            end
          >
            {location.pathname === '/' ? (
              <AiTwotoneHome size={30} />
            ) : (
              <AiOutlineHome size={30} />
            )}

            <span
              className={`${
                isModalOpen ? 'block' : 'hidden'
              } lg:hidden xl:block`}
            >
              ホーム
            </span>
          </NavLink>
        </li>
        <li
          className={`${
            isModalOpen ? 'justify-normal' : 'justify-center'
          } flex  py-2 md:justify-normal`}
          onClick={handleMenuListClick}
        >
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex items-center gap-4 xl:pr-6 p-3 dark:pointerhover:hover:bg-gray-700 pointerhover:hover:font-bold pointerhover:hover:bg-gray-300 bg-opacity-30 rounded-[9999px] w-max ${
                isActive && 'font-bold dark:bg-gray-700  bg-gray-300 '
              }`
            }
          >
            {location.pathname === '/search' ? (
              <ImSearch size={30} className="scale-[0.8]" />
            ) : (
              <AiOutlineSearch size={30} />
            )}

            <span
              className={`${
                isModalOpen ? 'block' : 'hidden'
              } lg:hidden xl:block`}
            >
              話題を検索
            </span>
          </NavLink>
        </li>
        <li
          className={`${
            isModalOpen ? 'justify-normal' : 'justify-center'
          } flex  py-2 md:justify-normal`}
          onClick={handleMenuListClick}
        >
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `flex items-center gap-4 xl:pr-6 p-3 dark:pointerhover:hover:bg-gray-700  pointerhover:hover:font-bold pointerhover:hover:bg-gray-300 bg-opacity-30 rounded-[9999px] w-max ${
                isActive && 'font-bold dark:bg-gray-700 bg-gray-300'
              }`
            }
          >
            {location.pathname === '/notifications' ? (
              <IoIosNotifications size={30} />
            ) : (
              <IoMdNotificationsOutline size={30} />
            )}

            <span
              className={`${
                isModalOpen ? 'block' : 'hidden'
              } lg:hidden xl:block`}
            >
              通知
            </span>
          </NavLink>
        </li>
      </div>

      <li
        className={`${
          isModalOpen && 'hidden'
        } hidden md:items-center xl:items-start md:flex md:flex-col-reverse xl:pl-2  p-3  gap-4 xl:m-0 md:m-auto md:mb-4 xl:mb-4 `}
      >
        <div
          className="flex w-full items-center gap-4 cursor-pointer p-3  dark:pointerhover:hover:bg-gray-700 pointerhover:hover:bg-gray-300 bg-opacity-30 rounded-[9999px]"
          onClick={() => navigate('/profile')}
        >
          {user && <HeaderProfile user={user} toProfile />}

          <div className="flex flex-col md:hidden xl:flex">
            <div className="text-lg font-semibold">{user?.displayName}</div>
            <div className="text-sm text-slate-500">
              @
              {!user?.email
                ? user?.displayName
                    ?.replace(/[^\w\s]/g, '')
                    ?.match(/\S+\s/)?.[0]
                    ?.toLocaleLowerCase()
                : user?.email?.replace(/@.*$/, '').toLocaleLowerCase()}
            </div>
          </div>
        </div>

        <Toggle />
      </li>
    </ul>
  );
};

export default MenuNavItem;
