import { Link } from "react-router-dom";
import DiaryCardList from '../components/DiaryCardList';
import HamburgerMenu from '../components/HamburgerMenu';

function Home() {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="w-full max-w-2xl">
            <div className="flex justify-between items-center">
             <HamburgerMenu />  {/* ← HamburgerMenuコンポーネントを追加 */}
             <h2 className="text-4xl font-semibold text-white mb-8">日報</h2>
             <div></div>  {/* この空のdivは、メニューボタンとタイトルの間にスペースを作るため */}
            </div>
                <div className="flex space-x-4 mb-8">
                    <Link to="/home" className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
                        Home
                    </Link>
                    <Link to="/" className="px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300">
                        Login
                    </Link>
                </div>
                <DiaryCardList />
            </div>
        </div>
    );
}

export default Home;
