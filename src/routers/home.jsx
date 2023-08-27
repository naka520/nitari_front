// import { Link } from "react-router-dom";
// import DiaryCardList from '../components/DiaryCardList';
// import Header from "../components/header/CustomHeader";

// function Home() {
//     return (
//         <div className="flex flex-col min-h-screen">
//             <Header />
//             <div className="flex flex-col items-center justify-center flex-1 bg-gradient-to-r from-blue-400 to-purple-500 p-4 lg:p-0">
//                 <div className="w-full max-w-2xl">
//                     <div className="flex flex-col lg:flex-row justify-between items-center">
//                         <h2 className="text-4xl font-semibold text-white mb-8 lg:mb-0">日報一覧</h2>
//                     </div>
//                     <div className="flex space-x-4 mb-8 mt-4">
//                         <Link to="/home" className="px-4 py-2 w-full text-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
//                             作成
//                         </Link>
//                         <Link to="/" className="px-4 py-2 w-full text-center bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300">
//                             Login
//                         </Link>
//                     </div>
//                     <DiaryCardList />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;
import { Link } from "react-router-dom";
import DiaryCardList from '../components/DiaryCardList';
import Header from "../components/header/CustomHeader";
import Notice from '../components/Notice'; // Notice.jsxをインポート
import { useEffect } from "react";
import liff from "@line/liff";
import {useState} from "react";

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const[resultmessage,setResultmessage]=useState("");
  const[accessToken,setAccessToken] =useState("");
  const[userId, setUserId] = useState("");

  useEffect(() => {
    const value = liff.getAccessToken()
    setAccessToken(value);
    const userInfo = liff.getProfile()
    setUserId(userInfo.userId);
  })


  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
//   const accessToken = liff.getAccessToken();
  console.log("ok");
  console.log(accessToken);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        {userId}
      </div>
      <div className="flex flex-col items-center justify-center flex-1 bg-gradient-to-r from-blue-400 to-purple-500 p-4 lg:p-0">
        <div className="w-full max-w-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <h2 className="text-4xl font-semibold text-white mb-8 lg:mb-0">日報一覧</h2>
          </div>
          <div className="flex space-x-4 mb-8 mt-4">
            <button onClick={toggleModal} className="px-4 py-2 w-full text-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
              作成
            </button>
            <Link to="/" className="px-4 py-2 w-full text-center bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300">
              Login
            </Link>
          </div>
          <DiaryCardList />

          {/* モーダルの表示 */}
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded p-8">
              <Notice isModalOpen={isModalOpen} toggleModal={toggleModal} accessToken={accessToken} userId={userId} />

                {/* <button onClick={toggleModal} className="float-right">
                  ✖️
                </button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;