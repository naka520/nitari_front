import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID, // 環境変数からLIFF IDを取得
      })
      .then(() => {
        setMessage("LIFF init succeeded.");

        // 既にログインしているか確認
        if (liff.isLoggedIn()) {
          setMessage("User already logged in");
        }
      })
      .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  }, []); // useEffect内の処理はコンポーネントのマウント時に1回だけ実行

  const handleLogin = () => {
    if (!liff.isLoggedIn()) {
      // ログインしていない場合は、ログイン画面に遷移
      liff.login();
    }
  };

  return (
    <div className="App">
       <div className="App-container">
      <h1>日報ちゃん</h1>
     
      <button onClick={handleLogin}>ログイン</button>
      {/* {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )} */}
      </div>
    </div>
  );
}

export default App;

