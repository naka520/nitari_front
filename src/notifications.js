import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";



function App() {



  return (
    <div className="App">
       <div className="App-container">
      <h1>aaaaa</h1>
     
      <button onClick={handleLogin}>ログイン</button>
      {/* {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )} */}
      {route === 'notifications' && <div>お知らせページ</div>}
      </div>
    </div>
  );
}

export default App;