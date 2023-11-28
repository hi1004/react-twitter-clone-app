import HomeAside from '@/components/layout/aside/HomeAside';
import ModalNav from '@/components/layout/nav/ModalNav';
import Notifications from '@/components/notifications/Notifications';
import Loader from '@/components/ui/Loader';
import { Suspense } from 'react';

const NotificationsPage = () => {
  return (
    <div className="relative flex flex-col justify-between w-full gap-8 md:w-auto md:mt-0 md:flex-row">
      <div className='md:w-[580px] flex flex-col relative mb-[70px] md:mb-0 md:min-h-screen w-full md:border-r dark:md:border-r-slate-700 md:border-r-slate-300"'>
        <ModalNav />
        <Notifications />
      </div>
      <div className="relative hidden lg:block">
        <Suspense fallback={<Loader />}>
          <HomeAside />
        </Suspense>
      </div>
    </div>
  );
};

export default NotificationsPage;
