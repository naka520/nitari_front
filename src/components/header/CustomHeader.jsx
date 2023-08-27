import HamburgerMenu from '../../components/HamburgerMenu'; // HamburgerMenu コンポーネントをインポート

function Header() {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-lg">
      <div className="flex items-center">
        {/* ハンバーガーメニューを追加 */}
        <HamburgerMenu />
        
        {/* サイトのタイトル */}
        <h1 className="text-black text-4xl font-playfair transform rotate-3">Nippoちゃん</h1>
      </div>

      {/* 他のヘッダーコンテンツ（例えば、検索バー、ログインボタンなど） */}
    </div>
  );
}

export default Header;
