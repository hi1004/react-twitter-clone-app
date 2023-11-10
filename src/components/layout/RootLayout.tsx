import Header from '@/components/layout/header/Header';
import MenuNav from '@/components/layout/nav/MenuNav';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { ModalProvider } from '@/context/ModalContext';
import { SignupProvider } from '@/context/SignupContext';
import { useContext, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

interface RootLayoutProps {
  isHeader?: boolean;
}
const RootLayout = ({ isHeader = true }: RootLayoutProps) => {
  const location = useLocation();
  const { user } = useContext(AuthContext as React.Context<AuthProps>);

  if (location.pathname === '/signup') {
    isHeader = false;
  }

  const headerComponent = useMemo(() => isHeader && <Header />, [isHeader]);
  return (
    <ModalProvider>
      <SignupProvider>
        {headerComponent}
        <main className={`px-8 ${user && 'px-0'}`}>
          <div
            className={`${
              user ? 'flex-row' : 'flex-col'
            } flex max-w-[1280px] md:w-full lg:w-[95vw] 2xl:w-10/12 xl:w-[1580px] m-auto md:justify-center`}
          >
            {user && <MenuNav />}
            <Outlet />
          </div>
        </main>
      </SignupProvider>
    </ModalProvider>
  );
};

export default RootLayout;
