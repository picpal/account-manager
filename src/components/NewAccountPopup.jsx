import React, { useEffect, useState } from "react";
import NewAccountPopupInput from "./NewAccountPopupInput";
import IndexedDBManager from "../api/IndexedDBManager";
import { encrypt } from "../encrypt/encrypt";
import { useRecoilState } from "recoil";
import { accountsState } from "../state/atoms"
import {accountsNextStatus} from "../state/selector"


const NewAccountPopup = ({setShowPopup}) => {
  const [dbManager, setDbManager] = useState(null);
  const [accounts, setAccounts] = useRecoilState(accountsNextStatus);

  useEffect(() => {
      const connectDB = new IndexedDBManager();
      setDbManager(connectDB);
  }, []);

  const processFormElements = (form, dbManager) => {
    const elementPromises = Array.from(form.elements).map((input) => {
      if (input.name) {
        if (input.name === 'up' || input.name === 'upChk') {
          return dbManager.getData("account", "user")
            .then((res) => {
              const value = encrypt(input.value, res.pinNum.substring(0, res.key.length));
              return { name: input.name, value: value };
            })
            .catch((e) => {
              console.error(e);
              return { name: input.name, value: input.value };
            });
        } else {
          return Promise.resolve({ name: input.name, value: input.value });
        }
      }
      return Promise.resolve(null);
    });
  
    // 모든 promises가 실행 될 때 까지 대기 후 진행
    return Promise.all(elementPromises).then((elements) => {
      const formData = {};
      elements.forEach((element) => {
        if (element) {
          formData[element.name] = element.value;
        }
      });
      return formData;
    });
  }
  
  const saveClickHandler = () => {
    const form = document.forms['accountform'];
    processFormElements(form, dbManager)
    .then((formData) => {
      if(formData){
        dbManager.saveData("accountList",formData);
      }
    })
    .catch((error) => {
      console.error('Error processing form:', error);
    });

    dbManager.getDataAll("accountList")
    .then((res)=>{
      setAccounts([...res]);
    })
    .catch((e)=>{
      console.log(e);
    });
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
          <NewAccountPopupInput name={"memo"} type={"text"} lebel={"서비스/프로그램 명"}/>
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