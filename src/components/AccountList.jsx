import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import IndexedDBManager from '../api/IndexedDBManager';
import Wrapper from './Wrapper';
import { useRecoilValue } from "recoil";
import { loginNextState } from "../state/selector";
import AccountItem from './AccountItem';
import AccountListHeader from './AccountListHeader';
import AccountSearchBar from './AccountSearchBar';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]); // 계정 데이터
  const [dbManager, setDbManager] = useState(null); // IDB object
  const loginState = useRecoilValue(loginNextState);

  const navigate = useNavigate();

  useEffect(() => {
    if(false){
    // if(!loginState){
      navigate("/"); // login 상태 체크
    } 

    const indexedDBManager = new IndexedDBManager('accountList');
    setDbManager(indexedDBManager);

    const accounts = indexedDBManager.getDataAll("accountList");
    accounts.then((res) => {
      // setAccounts(res);
    })


    setAccounts([{
      memo: "DB Safer",
      userId : "123456",
      userPw : "password",
      regDate : "20230101",
      accountStatus : "nomal"
    },{
      memo: "DB Safer",
      userId : "123456",
      uid : "1",
      regDate : "20230101",
      accountStatus : "nomal"
    }])
    
  }, []);

  const copyToClipboard = (id, pw) => {
    navigator.clipboard.writeText(`ID: ${id} / PW: ${pw}`);
  };

  const deleteAccount = (key) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      dbManager.deleteData("accountList", key);
      setAccounts(accounts.filter(account => account.id !== key));
    }
  };

  return (
    <Wrapper height={"720px"}>
      <AccountListHeader />
      <AccountSearchBar />
      <div className="w-full h-full overflow-auto">
        {accounts.length > 0 && accounts.map((account, index) => {
          return <AccountItem key={account.uid+index} idx={index+1} account={account}/>
        })}
        {
          accounts.length === 0 && <p>no data.</p>
        }
      </div>
    </Wrapper>
  );
};

export default AccountList;






