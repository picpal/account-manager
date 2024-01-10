import React, { useEffect, useState } from "react";
import AccountPopupInput from "./UI/AccountPopupInput";
import IndexedDBManager from "../api/IndexedDBManager";
import { decrypt, encrypt } from "../encrypt/encrypt";
import { useRecoilState } from "recoil";
import { showPopupState } from "../state/atoms";
import {accountsNextStatus} from "../state/selector"



const AccountInputPopup = () => {
  const [values, setValues] = useState({ memo : "", saveDate : "", ui : "", uid : "", up : "", url : "" });
  const [dbManager, setDbManager] = useState(null);
  const [, setAccounts] = useRecoilState(accountsNextStatus);
  const [showPopup, setShowPopup] = useRecoilState(showPopupState);

  useEffect(() => {
      const connectDB = new IndexedDBManager();
      setDbManager(connectDB);
  }, []);


  useEffect(() => {
    if (!showPopup.uid || !dbManager) return;
    
    if(showPopup.mode === 'fix'){
      dbManager.getData('accountList', showPopup.uid)
      .then((account)=>{
        dbManager.getData("account", "user")
        .then((userInfo)=>{
          const newValues = {...account , ...{
            up : decrypt(account.up, userInfo.pinNum.substring(0, userInfo.key.length)),
            upChk : decrypt(account.upChk, userInfo.pinNum.substring(0, userInfo.key.length))
          }}
  
          setValues((pre)=>{
              return {...pre , ...newValues}
          });
        })
        .catch((e)=>{
          console.log(e)
        });
      })
      .catch((e)=>{
        console.error(e);
      })
    }

  }, [showPopup.show,dbManager]);

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

  const validateParams = () => {
    const form = document.forms['accountform'];
    const frmData = {};
    Array.from(form.elements).map((input)=>{
      frmData[input.name] = input.value; 
    })

    const {up,upChk} = frmData;
    if(up !== upChk){
      alert("비밀번호와 확인이 일치하지 않습니다.")
      return false;
    }

    return true;
  }

  const saveData = () => {
    const form = document.forms['accountform'];

    if(!validateParams()) return;

    processFormElements(form, dbManager)
    .then((formData) => {
      if(formData){
        if(showPopup.mode === "fix"){
          dbManager.updateData("accountList",showPopup.uid,formData);
        }else{
          dbManager.saveData("accountList",formData);
        }

        dbManager.getDataAll("accountList")
        .then((res)=>{
          setAccounts(res);
        })
        .catch((err)=>{
          console.error(err)
        });
      }
    })
    .catch((error) => {
      console.error('Error processing form:', error);
    });

    setShowPopup(pre => {
      return {...pre, ...{uid: "", mode:"new" , show:false}};
    });
  }

  const saveKeypressHandler = (e) =>{

    if(e.key === 'Enter'){
      saveData();
    }
  }
  
  const saveClickHandler = () => {
    saveData();
  }
  
  const cancelClickHandler = () => {
    setShowPopup(pre => {
      return {...pre, ...{uid: "", mode:"new" , show:false}};
    });
  }

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full">
      <div className="absolute top-0 left-0 w-full h-full bg-slate-800 opacity-60">
      </div>
      <div className="relative w-3/4 mx-auto mt-7 p-7 rounded-md bg-white">
        <form name="accountform">
          <AccountPopupInput saveKeypressHandler={saveKeypressHandler} name={"memo"} value={values.memo} type={"text"} lebel={"서비스/프로그램 명"}/>
          <AccountPopupInput saveKeypressHandler={saveKeypressHandler} name={"url"} value={values.url} type={"text"} lebel={"서비스 URL"}/>
          <AccountPopupInput saveKeypressHandler={saveKeypressHandler} name={"ui"} value={values.ui} type={"text"} lebel={"계정"}/>
          <AccountPopupInput saveKeypressHandler={saveKeypressHandler} name={"up"} value={values.up} type={"password"} lebel={"비밀번호"}/>
          <AccountPopupInput saveKeypressHandler={saveKeypressHandler} name={"upChk"} value={values.upChk} type={"password"} lebel={"비밀번호 확인"}/>
          <AccountPopupInput saveKeypressHandler={saveKeypressHandler} name={"saveDate"} mode={showPopup.mode} value={values.saveDate} type={"date"} lebel={"비밀번호 변경일자"}/>
          
          <div className="mt-3 mx-auto w-fit text-sm flex flex-row gap-3 align-middle justify-end ">
            <div onClick={saveClickHandler} className="px-5 py-2 rounded-md bg-green-500 text-white cursor-pointer hover:opacity-70">저장</div>
            <div onClick={cancelClickHandler} className="px-5 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:opacity-70">취소</div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AccountInputPopup;