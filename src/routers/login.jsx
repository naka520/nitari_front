import { useEffect, useState } from "react";
import liff from "@line/liff";
import Home from './home';
import { Routes, Route, Link } from 'react-router-dom';

function Login() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [route, setRoute] = useState('App');
    const liffId = import.meta.env.VITE_LIFF_ID;
    
    
    useEffect(() => {
    // console.log("LIFF ID from env:", "2000541888-48gX2n5m"); // これを追加
    liff
        .init({
        liffId: liffId, // 環境変数からLIFF IDを取得
        })
        .then(() => {
        setMessage("LIFF init succeeded.");
        // console.log("LIFF ID from env:", "2000541888-48gX2n5m"); // これを追加
    
        // 既にログインしているか確認
        if (liff.isLoggedIn()) {
            setMessage("User already logged in");
        }
        })
        .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`Error: ${JSON.stringify(e)}`);
        });
    }, []); // useEffect内の処理はコンポーネントのマウント時に1回だけ実行
    
    const handleLogin = () => {
    if (!liff.isLoggedIn()) {
        // ログインしていない場合は、ログイン画面に遷移
        liff
        .login()
        .then(() => {
        // ログイン成功
            getAccessToken(); //
            setRoute('notifications'); // リダイレクト
        })
        .catch((err) => {
            setMessage('LIFF login failed');
            setError(err.toString());
        });
    }
    };

    const getAccessToken = () => {
        if (liff.isLoggedIn()) {
          // ログインしている場合はアクセストークンを取得
            const accessToken = liff.getAccessToken();
            // console.log("Your Access Token:", accessToken);
            localStorage.setItem("lineAccessToken", accessToken);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="p-10 rounded-lg shadow-md bg-white">
                <div className="text-2xl text-gray-700 font-bold">日報ちゃん</div>
                <button onClick={handleLogin} className="px-10 py-4 mt-4 ml-2 text-white bg-gray-700 rounded hover:bg-gray-500 transition duration-300">
                    ログイン
                </button>
                {/* {message && <p className="text-base font-bold">{message}</p>} */}
                {
                    error ? (
                        <div className="mt-4">
                            <p className="bg-gray-200 p-2 rounded">
                                <code>{error}</code>
                            </p>
                        </div>
                    ) : (
                        <div className="mt-10">
                            <Link to="/home" className="rounded-lg px-10 py-4 ml-4 text-white bg-gray-700 rounded hover:bg-gray-500 transition duration-300">
                                ホーム
                            </Link>
                        </div>
                    )
                
                }
            </div>
        </div>
    );
}

export default Login;

