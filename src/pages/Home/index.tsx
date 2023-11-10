import ModalNav from '@/components/layout/nav/ModalNav';
import { homeModalState } from '@/store/Nav/homeModalAtoms';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const HomePage = () => {
  const setIsModalOpen = useSetRecoilState(homeModalState);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsModalOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="w-full md:w-auto">
      <ModalNav />
      <div className="flex justify-between gap-4">
        <div className="md:w-[580px] w-full h-[300vh] md:border-r dark:md:border-r-slate-700 md:border-r-slate-300">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga rerum
          sit dolor. Facilis sint aliquid labore! Repellendus, libero enim
          reprehenderit distinctio repellat officiis excepturi non ea eligendi
          quos nesciunt maiores?
        </div>

        <aside className="w-[348px] grow hidden sticky top-0 h-[100vh] lg:block">
          <div className="">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repellendus nostrum blanditiis esse cupiditate beatae ipsa sint
            laborum eaque facere similique repellat aliquid, laboriosam qui,
            ipsum aspernatur ad numquam sit a non debitis! Nostrum magnam magni
            optio maxime quia ut nisi vitae obcaecati adipisci aperiam! Quae
            vitae perspiciatis est. Facilis, laudantium? Error dignissimos
            consequatur tempora id laborum provident praesentium totam atque
            excepturi quos iste, quae omnis sequi incidunt voluptas
            necessitatibus magni est accusamus eligendi. Explicabo nulla nisi,
            quae officiis blanditiis totam sequi molestias illum voluptatem?
            Placeat magni, ratione consequuntur vitae culpa rem non, dolorem
            commodi eveniet similique rerum tempora quae explicabo!
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
