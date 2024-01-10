import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import IndexedDBManager from '../api/IndexedDBManager';
import Wrapper from './UI/Wrapper';
import { useRecoilValue } from "recoil";
import { loginNextState } from "../state/selector";
import AccountItem from './AccountItem';
import AccountListHeader from './AccountListHeader';
import AccountSearchBar from './AccountSearchBar';
import { useRecoilState } from "recoil";
import { accountsState , filterAccountsState ,showPopupState} from "../state/atoms"
import { decrypt } from '../encrypt/encrypt';
import {isValidUrl} from '../utils/util'

const AccountList = () => {
  const [dbManager, setDbManager] = useState(null); // IDB object
  const loginState = useRecoilValue(loginNextState);
  const [accounts,setAccounts] = useRecoilState(accountsState);
  const [filterAccounts, setFilterAccounts] = useRecoilState(filterAccountsState);
  const [,setShowPopup] = useRecoilState(showPopupState);

  const navigate = useNavigate();
  
  useEffect(() => {
    if(!loginState){
      navigate("/"); // pin 입력 화면으로 이동
    } 

    const indexedDBManager = new IndexedDBManager();
    setDbManager(indexedDBManager);

    const accounts = indexedDBManager.getDataAll("accountList");
    accounts.then((res) => {
      setAccounts(res);
      setFilterAccounts(res);
    })

   
  }, []);

  // 목록 변경 시 리렌더링을 위한 effect
  useEffect(() => {
    setFilterAccounts(accounts);
  },[accounts]);

  useEffect(() => {
    console.log(`filterAccounts : uesEffect`)
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  },[filterAccounts]);

  const handleKeyPress = (event) => {
    if(!event.key) return;
    
    const eventKeys = Array.from({ length: 9 }, (_, i) => (i + 1).toString());
    if (eventKeys.includes(event.key) && event.altKey) {
      if(filterAccounts[Number(event.key)-1]){
        const {uid , url} = filterAccounts[Number(event.key)-1];
        moveUrl(uid, url);
      }
    }
  };

  // 삭제
  const removeBtnClickHandler = (e) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      const uid = e.currentTarget.dataset.uid;
      dbManager.deleteData('accountList',uid);
      const newData = accounts.filter(item => item.uid !== uid);
      setAccounts(newData);
    }
  }

  // 복사
  const copyBtnClickHandler = async (e) => {
    const uid = e.currentTarget.dataset.uid;
    const account = await dbManager.getData('accountList',uid);
    const userInfo = await dbManager.getData("account", "user");
    navigator.clipboard.writeText(decrypt(account.up, userInfo.pinNum.substring(0, userInfo.key.length)))
  }

  const moveUrl = async (uid, url) => {
    if(!url || !uid || !isValidUrl(url)) return;

    const userInfo = await dbManager.getData("account", "user");
    const account = await dbManager.getData('accountList',uid);
    const linkData = [
      {
        tag : ["mgrId","username" , "j_username","id"],
        value : account.ui
      },
      {
        tag : ["ecpyPwd","password" , "j_password"],
        value : decrypt(account.up, userInfo.pinNum.substring(0, userInfo.key.length))
      }
    ]

    // 페이지 이동 및 값 전달 요청
    window.chrome.runtime.sendMessage({action: "navigateAndSend", url: url, value: linkData});
  }

  // 링크 클릭 이벤트
  const linkBtnClickHandler = async (e) => {
    const {uid, url} = e.currentTarget.dataset;
    await moveUrl(uid, url);
  }

  // 계정 정보 수정
  const accountModClickHandler = async (e) => {
    const uid = e.currentTarget.dataset.uid;
    
    if(!uid) return;
    // const account = await dbManager.getData('accountList',uid);

    setShowPopup({mode:'fix',show:true,uid});
  }

  return (
    <Wrapper height={"570px"}>
      <AccountListHeader />
      <AccountSearchBar />
      <div className="w-full h-[400px] overflow-y-auto" >
        {filterAccounts.length > 0 && filterAccounts.map((account, index) => {
          return <AccountItem key={account.uid}
                              account={account}
                              accountModClickHandler={accountModClickHandler} 
                              linkBtnClickHandler={linkBtnClickHandler}
                              removeBtnClickHandler={removeBtnClickHandler} 
                              copyBtnClickHandler={copyBtnClickHandler}/>
        })}
        {
          filterAccounts.length === 0 && <p className='py-10 text-center text-lg'>No Account Data.</p>
        }
      </div>
    </Wrapper>
  );
};

export default AccountList;






