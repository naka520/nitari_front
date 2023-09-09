import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DiaryCardList from '../components/DiaryCardList';
import Header from "../components/header/CustomHeader";
import Notice from '../components/Notice'; 
import liff from "@line/liff";
import axios from 'axios';
import '../index.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Home() {
  const navigater = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);

  // Fetch data from the API
  const getData = async (inUserId, inAccessToken) => {
    const apiURL = "https://func-nitari-backend.azurewebsites.net/api/diary/all";
    await axios.get(`${apiURL}?userId=${inUserId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': inAccessToken,
      }
    })
    .then((response => {
      console.log(response)
      setData(prevData => [...prevData, ...response.data]);
    }))
    .catch((error) => {
      console.error(error)
    });
  };

  async function init() {
    const value = await liff.getAccessToken();
    setAccessToken(value);
    const userInfo = await liff.getProfile();
    setUserId(userInfo.userId);
    getData(userInfo.userId, value);
  }

  // Initialize data when the component mounts
  useEffect(() => {
    async function fetchData() {
      const authInfo = await liff.getProfile()
      const isLogined = await liff.isLoggedIn(authInfo.userId)
      await init();
    }
    fetchData();
  }, []);

  // Toggle modal open/close
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="BackColor flex flex-col min-h-screen h-auto w-screenn">
      <Header />
      <div className="">
        <div className=" ">
          <h2 className="myFont text-4xl  mb-8 lg:mb-0 font-bold">Calender</h2>
          <div className="w-full  flex-grow ">
        <div >
          <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            className="mycalender"
            contentHeight={500}
          />
        </div>

    </div>
          <div className="flex space-x-4 mb-8 mt-4">
            {/* <button onClick={toggleModal} className="myFont px-4 py-2 w-full text-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
              Create
            </button>
            <Link to="/" className="myFont px-4 py-2 w-full text-center bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300">
              Login
            </Link> */}
          </div>
          {/* <DiaryCardList data={data} /> */}

          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded p-8">
              {
                (accessToken && userId) ? 
                  <Notice isModalOpen={isModalOpen} toggleModal={toggleModal} accessToken={accessToken} userId={userId} /> : 
                  null
              }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
