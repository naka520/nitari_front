import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DiaryCardList from '../components/DiaryCardList';
import Header from "../components/header/CustomHeader";
import Notice from '../components/Notice'; 
import liff from "@line/liff";
import axios from "axios";
import '../index.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Home() {
  const navigater = useNavigate()
  const liffId = import.meta.env.VITE_LIFF_ID;

  const [isModalOpen, setModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);

  // Fetch data from the API
  const getData = async (inUserId, inAccessToken) => {
    const apiURL = "https://func-backend.azurewebsites.netapi/diary/all";
    axios.get(`${apiURL}?userId=${inUserId}`, {
      headers: {
        'accept': 'application/json',
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



  // Initialize data when the component mounts
  useEffect(() => {
    const fetchInitData = async () => {
      let value;
      let userInfo;

      try {
        liff.init({liffId: liffId})
      } catch (err) {
        console.error(err)
      }
      
      try {
        value = await liff.getAccessToken();
      } catch (err) {
        console.error("Failed to get access token: ", err);
        return;
      }
  
      try {
        userInfo = await liff.getProfile();
      } catch (err) {
        console.error("Failed to get user info: ", err);
        return;
      }
      
      setAccessToken(value);
      setUserId(userInfo.userId);
  
      const apiURL = "https://func-backend.azurewebsites.net/api/diary/all";
  
      try {
        console.log(apiURL)
        console.log(userInfo.userId)
        console.log(value)

        const response = await axios.get(`${apiURL}?userId=${userInfo.userId}`, {
          headers: {
            "Authorization": value,
            "accept": "application/json",
          },
        });
        
        console.log(response);
        setData(prevData => [...prevData, ...response.data]);
      } catch (err) {
        console.error("Failed to fetch data: ", err);
      }
    };
  
    fetchInitData();
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
          <h2 className="myFont text-4xl  mb-8 lg:mb-0 font-bold pl-6">Calender</h2>
          <div className="w-full  flex-grow ">
        <div className="myFont font-bold pr-6 pl-6">
          <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            className="mycalender"
            contentHeight={500}
            aspectRatio={1.5}
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
          <DiaryCardList className="font-black"data={data} />

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
