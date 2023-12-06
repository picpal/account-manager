import React, { useEffect, useState } from 'react';
import IndexedDBManager from '../api/IndexedDBManager';

const InputPin = ({title = "Enter a new 6-digit PIN"}) => {
    const [dbManager, setDbManager] = useState(null);

    useEffect(() => {
        document.getElementById('pin0').focus();
        const indexedDBManager = new IndexedDBManager('Account');
        setDbManager(indexedDBManager);
        }, []);

    const handleInput = (index, value) => {
        if (value.match(/[0-9]/) && index < 5) {
        document.getElementById(`pin${index + 1}`).focus();
        } else if (value.match(/[0-9]/) && index === 5) {
        savePin();
        }
    };

    const savePin = () => {
        const pinValue = Array.from({ length: 6 }).map((_, index) => document.getElementById(`pin${index}`).value).join('');
        dbManager.saveData({pin_number:pinValue})
    };

  return (
    <div className="flex items-center justify-center h-scree">
      <div className=" p-8">
        <p className="text-xl font-bold text-center mb-4">{title}</p>
        <div className="flex flex-wrap justify-between mb-6 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              id={`pin${index}`}
              className="w-10 h-10 border-2 rounded-lg border-gray-300 text-center text-xl mr-2 mb-2"
              type="password"  // 입력이 완료된 칸은 짙은회색으로 채워주세요.
              maxLength="1"
              onChange={(e) => handleInput(index, e.target.value)}
            />
          ))}
        </div>
        <button className="w-full py-3 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline">
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default InputPin;