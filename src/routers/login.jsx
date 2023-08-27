import { useEffect, useState } from "react";
import liff from "@line/liff";
import Home from './home';
import { Routes, Route, Link } from 'react-router-dom';

function Login() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [route, setRoute] = useState('App');
    const liffId = "2000541888-48gX2n5m";
    
    useEffect(() => {
    console.log("LIFF ID from env:", "2000541888-48gX2n5m"); // これを追加
    liff
        .init({
        liffId: "2000541888-48gX2n5m", // 環境変数からLIFF IDを取得
        })
        .then(() => {
        setMessage("LIFF init succeeded.");
        console.log("LIFF ID from env:", "2000541888-48gX2n5m"); // これを追加
    
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
        setRoute('notifications'); // リダイレクト
        })
        .catch((err) => {
        setMessage('LIFF login failed');
        setError(err.toString());
        });
    }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <div className="bg-white p-10 rounded-lg shadow-md">
                <h1 className="font-mono text-2xl text-gray-700">日報ちゃん</h1>
                <button onClick={handleLogin} className="px-8 py-4 mt-4 text-white bg-green-500 rounded hover:bg-gray-700 transition duration-300">
                    ログイン
                </button>
                {message && <p className="text-base">{message}</p>}
                {
                    error ? (
                        <p className="bg-gray-200 p-2 rounded">
                            <code>{error}</code>
                        </p>
                    ):
                    (
                        <>
                        </>
                    )
                }
                {route === 'notifications' && <div className="mt-4">お知らせページ</div>}
            </div>
        </div>
    );
}

export default Login;

