import { useState } from 'react';
import { Link } from 'react-router-dom';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none lg:hidden">
        <div className="w-6 h-0.5 mb-1 bg-white"></div>
        <div className="w-6 h-0.5 mb-1 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-48 bg-white rounded shadow-lg">
          <Link to="/home" onClick={() => setIsOpen(false)} className="block px-4 py-2">Home</Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2">Login</Link>
          {/* 他のリンクもこちらに追加 */}
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
