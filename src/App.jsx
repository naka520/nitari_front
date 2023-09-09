import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./index.css";
import "./App.css";
import Home from './routers/home';
import Login from "./routers/login";
import { Routes, Route, Link } from 'react-router-dom';


function App() {

  return (
      <Routes>
        <Route className="myFont" path="/" element={<Login />} />
        <Route className="myFont" path="/home" element={<Home />} />
      </Routes>
  );
}

export default App;

