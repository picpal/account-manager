import React, { useEffect, useState } from "react";
import NewAccountPopupInput from "./NewAccountPopupInput";
import IndexedDBManager from "../api/IndexedDBManager";
import { useRecoilState } from "recoil";
import { helloState } from "../state/atoms"
import { decrypt, encrypt } from "../encrypt/encrypt";

const NewAccountPopup = ({setShowPopup}) => {
  const [hello, ] = useRecoilState(helloState);
  const [dbManager, setDbManager] = useState(null);

  useEffect(() => {
      const connectDB = new IndexedDBManager();
      setDbManager(connectDB);
  }, []);

  const saveClickHandler = () => {
    const form = document.forms['accountform'];
    const formData = {};
    Array.from(form.elements).forEach((input) => {
      if (input.name) {
        let value = input.value;
        if(input.name === 'userPw' || input.name === 'userPwChk'){        
          value = encrypt(value,hello);
        }

        formData[input.name] = value;
      }
    });

    if(formData){
      dbManager.saveData("accountList",formData);
    }

    setShowPopup(false);
  }
  
  const cancelClickHandler = () => {
    setShowPopup(false);
  }

  return (
    <div className="absolute top-0 w-full h-full ">
      <div className="absolute z-50  top-0 left-0 w-full h-full bg-slate-800 opacity-60">
      </div>
      <div className="relative z-50 w-3/4 mx-auto mt-7 p-6 rounded-sm bg-white">
        <form name="accountform">
          <NewAccountPopupInput name={"serviceName"} type={"text"} lebel={"서비스/프로그램 명"}/>
          <NewAccountPopupInput name={"ui"} type={"text"} lebel={"계정"}/>
          <NewAccountPopupInput name={"up"} type={"password"} lebel={"비밀번호"}/>
          <NewAccountPopupInput name={"upChk"} type={"password"} lebel={"비밀번호 확인"}/>
          <NewAccountPopupInput name={"saveDate"} type={"date"} lebel={"비밀번호 변경일자"}/>
          
          <div className="mt-3 text-sm flex flex-row gap-3 align-middle justify-end">
            <div onClick={saveClickHandler} className="px-4 py-1 rounded-md bg-lime-700 text-white hover:opacity-70">저장</div>
            <div onClick={cancelClickHandler} className="px-4 py-1 rounded-md bg-red-700 text-white hover:opacity-70">취소</div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default NewAccountPopup;