import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import DatePicker from 'react-datepicker'; 
import { format } from 'date-fns';

const Notice = ({ isModalOpen, toggleModal, accessToken, userId }) => {
  const [entries, setEntries] = useState([{ activity: '', feeling: '' }]);
  const [date, setDate] =  useState(new Date());; // dateのstateを追加
  const [isLoading, setIsLoading] = useState(false);

  const addEntry = () => {
    setEntries([...entries, { activity: '', feeling: '' }]);
  };

  const removeEntry = (index) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  const updateEntry = (index, key, value) => {
    const newEntries = [...entries];
    newEntries[index][key] = value;
    setEntries(newEntries);
  };

  function getToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0!
    var yyyy = today.getFullYear();

    if(dd < 10) {
        dd = '0' + dd;
    } 
    if(mm < 10) {
        mm = '0' + mm;
    } 
    return yyyy + mm + dd;
  }

  const postEntity = async () => {
    setIsLoading(true);

    // const token = 'YOUR_ACCESS_TOKEN_HERE'; // 事前に取得したアクセストークン
    const url = "https://func-backend.azurewebsites.net/api/diary"; // POSTするAPIのエンドポイント
    const apiDate = format(date, 'yyyyMMdd');

    await axios.post(url, {
      userId: userId,
      tagDiaries: entries,
      date: apiDate,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      }
    })
    .then((response) => {
      console.log('Success:', response.data);
      setIsLoading(false);
      toggleModal(); // モーダルを閉じるなど、成功した後の処理
    })
    .catch((error) => {
      setIsLoading(false);
      alert("作成に失敗しました");
      console.error('Error posting entity:', error);
    })
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-8">
            <button onClick={toggleModal} className="float-right  border-2 border-dashed border-gray-500 bg-white px-1 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
            <div className="p-8 Notice font-bold border-2 border-dashed border-gray-500">
              <div className="container mx-auto">
                {entries.map((entry, index) => (
                  <div key={index} className="flex space-x-4 mb-4">
                    <input
                      type="text"
                      placeholder="今日やったこと"
                      value={entry.activity}
                      onChange={(e) => updateEntry(index, 'activity', e.target.value)}
                      className="p-2 border rounded w-1/2 font-bold border-2 border-dashed border-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="感じたこと"
                      value={entry.feeling}
                      onChange={(e) => updateEntry(index, 'feeling', e.target.value)}
                      className="p-2 border rounded w-1/2 font-bold border-2 border-dashed border-gray-500"
                    />
                    <button onClick={() => removeEntry(index)} className="bg-white  border-2 border-dashed border-gray-500 text-white p-2 rounded px-1 py-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button onClick={addEntry} className="font-bold border-2 border-dashed border-gray-500  p-2 rounded px-1 py-1 bg-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datepicker">
                    日付選択:
                  </label>
                  <DatePicker 
                    selected={date} 
                    onChange={(date) => setDate(date)} 
                    dateFormat="yyyy/MM/dd"
                    id="datepicker"
                    className="p-2 border rounded w-full font-bold border-2 border-dashed border-gray-500"
                    maxDate={new Date()}
                  />
                </div>
                <div>
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                  ) : (
                    <>
                      {/* onClickを修正 */}
                      <button onClick={postEntity} className="bg-gray-700 text-white p-2 rounded ml-4">
                        日報を投稿
                      </button>
                    </>
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notice;
