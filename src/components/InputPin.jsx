import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import IndexedDBManager from '../api/IndexedDBManager';
import {encryptSHA256} from '../encrypt/encrypt'
import {vaildPassword} from '../utils/util'
import Wrapper from './Wrapper';
import InputPinDiffMsg from './InputPinDiffMsg';

const InputPin = ({setLogin}) => {
    const [dbManager, setDbManager] = useState(null);
    const [showMsg, setShowMsg] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById('pin0').focus();
        const indexedDBManager = new IndexedDBManager('account');
        setDbManager(indexedDBManager);
    }, []);

    const handleInput = (index, value) => {
        if (value.match(/[0-9]/) && index < 5) {
          document.getElementById(`pin${index + 1}`).focus();
        } else if (value.match(/[0-9]/) && index === 5) {
          checkPin();
          document.getElementById(`pin${index}`).blur();
        }
    };

    const checkPin = () => {
        const pinValue = Array.from({ length: 6 }).map((_, index) => document.getElementById(`pin${index}`).value).join('');
        const hashPin = encryptSHA256(pinValue);
        
        dbManager.getData("account","user").then((user) => {
            if(!user){
                dbManager.saveData("account",{uid:"user", pinNum:hashPin});
                alert(`Don't Forget Password : [${pinValue}]`);
                setLogin(true);
                navigate("/list")
            }else{
                if(vaildPassword(hashPin,user.pinNum)){
                    setShowMsg(false);
                    setLogin(true);
                    navigate("/list")
                }else{
                    setShowMsg(true);
                    Array.from({ length: 6 }).forEach((_, index) => {
                        document.getElementById(`pin${index}`).value = '';
                    });
                    document.getElementById('pin0').focus();
                }
            }
        });
    };
    
  const handleBackspace = (index) => {
      if (index > 0) {
          document.getElementById(`pin${index - 1}`).focus();
      }
  };

  return (
    <Wrapper>
        <div className="flex items-center justify-center h-scree">
        <div className="p-8">
            <p className="text-xl font-bold text-center mb-4">PIN번호 6자리 입력</p>
            <div className="flex flex-wrap justify-between mb-2 mt-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <input
                key={index}
                id={`pin${index}`}
                className="w-10 h-10 border-2 rounded-lg border-gray-300 text-center text-xl mr-2 mb-2"
                type="password"
                maxLength="1"
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                        handleBackspace(index);
                    }
                }}
                />
            ))}
            </div>
            <div className="mb-4">
                {showMsg && <InputPinDiffMsg />}
            </div>
            <button className="w-full py-3 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline">
            CANCEL
            </button>
        </div>
        </div>
    </Wrapper>
  );
};

export default InputPin;
