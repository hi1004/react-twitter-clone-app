import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();
const LINKS = [
  '基本情報',
  'Xアプリをダウンロード',
  'ヘルプセンター',
  '利用規約',
  'プライバシーポリシー',
  'Cookieのポリシー',
  'アクセシビリティ',
  '広告情報',
  'ブログ',
  'ステータス',
  '採用情報',
  'ブランドリソース',
  '広告',
  'マーケティング',
  'Xのビジネス活用',
  '開発者',
  'プロフィール一覧',
  '設定',
  `&copy; ${currentYear} X Corp.`,
];

const Footer = () => {
  return (
    <footer className="text-center mt-10 sm:mt-20 md:mt-12 lg:mt-20 xl:mt-28">
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center ">
        {LINKS.map((link, index) => (
          <li
            key={index}
            className="text-slate-400 text-xs pointerhover:hover:underline"
          >
            <Link to="/">{link}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
