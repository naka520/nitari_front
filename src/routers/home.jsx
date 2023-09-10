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
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from '@fullcalendar/core/locales/ja';
import { format } from 'date-fns';

function Home() {
  const navigate = useNavigate();
  const liffId = import.meta.env.VITE_LIFF_ID;

  const [isModalOpen, setModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchInitData = async () => {
      let value;
      let userInfo;

      try {
        liff.init({liffId: liffId});
      } catch (err) {
        console.error(err);
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
        const response = await axios.get(`${apiURL}?userId=${userInfo.userId}`, {
          headers: {
            "Authorization": value,
            "accept": "application/json",
          },
        });
        
        setData(prevData => [...prevData, ...response.data]);
        console.log(response.data);
      } catch (err) {
        console.error("Failed to fetch data: ", err);
      }
    };
  
    fetchInitData();
  }, []);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleDateClick = (arg) => {
    const clickedDate = arg.date;

    // エラーチェック部分
    if (!clickedDate || !(clickedDate instanceof Date)) {
      console.error("Invalid clicked date:", clickedDate);
      return;
    }

    const yyyymmdd = format(clickedDate, 'yyyyMMdd');
    console.log("Clicked Date:", yyyymmdd);  // ここでクリックした日付をログ出力

    // データが存在するかどうかを確認
    const hasDataForDate = data.some(entry => entry.date === yyyymmdd);
    console.log("Has Data for the Date:", hasDataForDate);  // ここでデータの存在をログ出力

    if (hasDataForDate) {
      console.log("Navigating to:", `/day/${yyyymmdd}`);  // ここでナビゲートするURLをログ出力
      navigate(`/day/${yyyymmdd}`);
    } else {
      if (window.confirm("この日には日記データがありません。新しい日報を作成しますか？")) {
        toggleModal();
      }
    }
  };


  function renderEventContent(eventInfo) {
    return (
      <div className="fc-event-title">
        {eventInfo.event.title}
      </div>
    );
  }

  const events = data.map(entry => ({
      title: '完了✅',
      start: entry.date,
    }));

    const handleEventClick = (eventClickInfo) => {
    const clickedEventDate = eventClickInfo.event.start;

    if (!clickedEventDate || !(clickedEventDate instanceof Date)) {
      console.error("Invalid clicked event date:", clickedEventDate);
      return;
    }

    const yyyymmdd = format(clickedEventDate, 'yyyyMMdd');
    console.log("Clicked Event Date:", yyyymmdd);
    
    console.log("Navigating to:", `/day/${yyyymmdd}`);
    navigate(`/day/${yyyymmdd}`);
  };

  return (
    <div className="BackColor flex flex-col min-h-screen h-auto w-screen">
      <Header />
      <div className="">
        <div className=" ">
          <div className="flex items-center mb-8 justify-center">
            {/* <h2 className="myFont text-4xl mb-8 lg:mb-0 font-bold">カレンダー</h2> */}
            <button 
              onClick={toggleModal} 
              className="myFont font-bold py-6 px-6 text-black text-center  border-2 border-dashed border-black rounded transition duration-300 "
            >
              日報を生成する
            </button>
          </div>
          <div className="w-full  flex-grow ">
            <div className="myFont font-bold pr-6 pl-6">
              <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                className="mycalender"
                contentHeight={500}
                aspectRatio={1.5}
                locale={jaLocale}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                events={events}
                eventContent={renderEventContent}
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-8 mt-4">
          </div>
          {/* <DiaryCardList className="font-black" data={data} /> */}

          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded p-8">
                {(accessToken && userId) ? 
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
