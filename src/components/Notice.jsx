import React, { useState } from 'react';
import axios from 'axios';

const Notice = ({ isModalOpen, toggleModal, accessToken, userId }) => {
  const [entries, setEntries] = useState([{ activity: '', feeling: '' }]);
  const [date, setDate] = useState(''); // dateのstateを追加
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
    return '' + yyyy + mm + dd;
  }

  const postEntity = async () => {
    setIsLoading(true);

    // const token = 'YOUR_ACCESS_TOKEN_HERE'; // 事前に取得したアクセストークン
    const url = 'https://func-nitari-backend.azurewebsites.net/api/diary'; // POSTするAPIのエンドポイント
    const apiDate = getToday(); // 変数名を変更

    await axios.post(url, {
      userId: userId,
      tagDiaries: entries,
      date: apiDate, // useStateのdateではなく、getTodayから取得したdateを使用
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
            <button onClick={toggleModal} className="float-right">
              ✖️
            </button>
            <div className="p-8 bg-gray-100">
              <div className="container mx-auto">
                {entries.map((entry, index) => (
                  <div key={index} className="flex space-x-4 mb-4">
                    <input
                      type="text"
                      placeholder="Activity"
                      value={entry.activity}
                      onChange={(e) => updateEntry(index, 'activity', e.target.value)}
                      className="p-2 border rounded w-1/2"
                    />
                    <input
                      type="text"
                      placeholder="Feeling"
                      value={entry.feeling}
                      onChange={(e) => updateEntry(index, 'feeling', e.target.value)}
                      className="p-2 border rounded w-1/2"
                    />
                    <button onClick={() => removeEntry(index)} className="bg-red-500 text-white p-2 rounded">
                      削除
                    </button>
                  </div>
                ))}
                <button onClick={addEntry} className="bg-blue-500 text-white p-2 rounded">
                  追加
                </button>
                <div>
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                  ) : (
                    <>
                      {/* onClickを修正 */}
                      <button onClick={postEntity} className="bg-green-500 text-white p-2 rounded ml-4">
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
