import Thisweek from './thisweek';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header/CustomHeader";
import axios from "axios";
import '../index.css';

const ThisWeek = () =>{
  return(
    <div className="BackColor flex flex-col min-h-screen h-auto w-screenn">
      <Header/>

    </div>
    
  );
}
export default ThisWeek;