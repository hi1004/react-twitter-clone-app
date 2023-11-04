import Header from '@/components/layout/Header';
import MenuNav from '@/components/layout/MenuNav';
import { Outlet } from 'react-router-dom';

interface RootLayoutProps {
  isHeader?: boolean;
  isNav?: boolean;
}
const RootLayout = ({ isHeader = true, isNav = true }: RootLayoutProps) => {
  return (
    <main className="px-8">
      {isHeader && <Header />}
      <Outlet />
      {isNav && <MenuNav />}
    </main>
  );
};

export default RootLayout;
