import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";



function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [route, setRoute] = useState('App');
  const liffId = "2000541888-bDrj80Gm";

  useEffect(() => {
    console.log("LIFF ID from env:", "2000541888-bDrj80Gm"); // これを追加
    liff
      .init({
        liffId: "2000541888-bDrj80Gm", // 環境変数からLIFF IDを取得
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
        console.log("LIFF ID from env:", "2000541888-bDrj80Gm"); // これを追加

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
    <div className="App">
       <div className="App-container">
      <h1>日報ちゃん</h1>
     
      <button onClick={handleLogin}>ログイン</button>
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      {route === 'notifications' && <div>お知らせページ</div>}
      </div>
    </div>
  );
}

export default App;

