import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} >
        <div className="w-6 h-0.5 mb-1 bg-white"></div>
        <div className="w-6 h-0.5 mb-1 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>
      {isOpen && (
        <div className="myFont absolute top-full left-0 w-48 bg-white rounded shadow-lg">
          <Link to="/home" onClick={() => setIsOpen(false)} className="block px-4 py-2 border-slate-300 font-bold">Home</Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2 font-bold">This Week</Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2 font-bold">Logout</Link>
          {/* 他のリンクもこちらに追加 */}
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="BackColor flex items-center justify-between p-4 border-b-2 border-dashed border-gray-500 mb-12">
      <HamburgerMenu />
      <h1 className="myFont text-5xl text-black font-bold">DayWrite</h1>
      {/* 他のヘッダーコンテンツ */}
    </header>
  );
}

export default Header;
