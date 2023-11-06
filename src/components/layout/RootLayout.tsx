import Header from '@/components/layout/Header';
import MenuNav from '@/components/layout/MenuNav';
import { LoginProvider } from '@/context/AuthContext';
import { ModalProvider } from '@/context/ModalContext';
import { SignupProvider } from '@/context/SignupContext';
import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

interface RootLayoutProps {
  isHeader?: boolean;
  isNav?: boolean;
}
const RootLayout = ({ isHeader = true, isNav = true }: RootLayoutProps) => {
  const location = useLocation();

  if (location.pathname === '/signup') {
    isHeader = false;
  }

  const headerComponent = useMemo(() => isHeader && <Header />, [isHeader]);
  const navComponent = useMemo(() => isNav && <MenuNav />, [isNav]);

  return (
    <ModalProvider>
      <SignupProvider>
        <LoginProvider>
          <main className="px-8">
            {headerComponent}
            <Outlet />
            {navComponent}
          </main>
        </LoginProvider>
      </SignupProvider>
    </ModalProvider>
  );
};

export default RootLayout;
