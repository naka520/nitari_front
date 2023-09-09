import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    try {
      setIsOpen(false); // モーダルを閉じる
      await liff.logout(); // ユーザーをログアウトさせる
      window.location.href = "/"; // ホームページにリダイレクト
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <div className="relative">
      <button className="bg-gray-500" onClick={() => setIsOpen(!isOpen)} >
        <div className="w-6 h-0.5 mb-1 bg-white"></div>
        <div className="w-6 h-0.5 mb-1 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>
      {isOpen && (
        <div className="myFont absolute top-full left-0 w-48 bg-white rounded shadow-lg">
          <Link to="/home" onClick={() => setIsOpen(false)} className="block px-4 py-2 border-slate-300 font-bold">ホーム</Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2 font-bold">今週の日報</Link>
          <Link to="/" onClick={handleLogout} className="block px-4 py-2 font-bold">ログアウト</Link>
          {/* 他のリンクもこちらに追加 */}
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b-2 border-dashed border-gray-500 mb-12">
      <HamburgerMenu />
      <h1 className="myFont text-5xl text-black font-bold">日報ちゃん</h1>
      {/* 他のヘッダーコンテンツ */}
    </header>
  );
}

export default Header;
