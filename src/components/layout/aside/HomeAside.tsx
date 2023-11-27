import Search from '@/components/search/Search';
import { uniqueId } from 'lodash';

const footerData = [
  '利用規約',
  'プライバシーポリシー',
  'Cookieのポリシー',
  'アクセシビリティ',
  '広告情報',
  'もっと見る',
];

const HomeAside = () => {
  return (
    <aside className="w-[348px] grow hidden sticky top-0 h-[100vh] lg:block">
      {location.pathname !== '/search' && <Search />}

      <ul className="flex flex-wrap text-sm gap-y-1 gap-x-3 text-slate-400">
        {footerData.map(data => (
          <li
            className="cursor-pointer pointerhover:hover:underline"
            key={uniqueId()}
          >
            {data}
          </li>
        ))}
        <li>© {new Date().getFullYear()} X Corp.</li>
      </ul>
    </aside>
  );
};

export default HomeAside;
