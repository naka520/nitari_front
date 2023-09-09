import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./index.css";
import "./App.css";
import Home from './routers/home';
import Login from "./routers/login";
import Day from "./routers/day";
import { Routes, Route, Link } from 'react-router-dom';


function App() {

  return (
      <Routes>
        <Route className="myFont" path="/" element={<Login />} />
        <Route className="myFont" path="/home" element={<Home />} />
        <Route className="myFont" path="/day/:yyyymmdd" element={<Day />} />
      </Routes>
  );
}

export default App;

