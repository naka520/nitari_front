import React, { useState } from 'react';

const Notice = ({ isModalOpen, toggleModal }) => {
  const [entries, setEntries] = useState([{ activity: '', feeling: '' }]);

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
                <button onClick={() => console.log(entries)} className="bg-green-500 text-white p-2 rounded ml-4">
                  日報を投稿
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notice;
