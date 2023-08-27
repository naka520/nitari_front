import HamburgerMenu from '../../components/HamburgerMenu';

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <HamburgerMenu />
      <h1 className="text-4xl font-semibold text-black transform rotate-3">日報ちゃん</h1>
      {/* 他のヘッダーコンテンツ */}
    </header>
  );
}

export default Header;
