import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import IndexedDBManager from '../api/IndexedDBManager';
import Wrapper from './Wrapper';
import { useRecoilValue } from "recoil";
import { loginNextState } from "../state/selector";
import AccountItem from './AccountItem';
import AccountListHeader from './AccountListHeader';
import AccountSearchBar from './AccountSearchBar';
import { useRecoilState } from "recoil";
import { accountsState , filterAccountsState} from "../state/atoms"

const AccountList = () => {
  const [dbManager, setDbManager] = useState(null); // IDB object
  const loginState = useRecoilValue(loginNextState);
  const [accounts, setAccounts] = useRecoilState(accountsState);
  const [filterAccounts, setFilterAccounts] = useRecoilState(filterAccountsState);

  const navigate = useNavigate();

  useEffect(() => {
    if(!loginState){
      navigate("/"); // pin 입력 화면으로 이동
    } 

    const indexedDBManager = new IndexedDBManager();
    setDbManager(indexedDBManager);

    const accounts = indexedDBManager.getDataAll("accountList");
    accounts.then((res) => {
      // setAccounts(res);
    })

    const fakeData = [{
      memo: "DB Safer",
      userId : "123456",
      userPw : "password",
      uid : "1",
      regDate : "20230101",
      accountStatus : "nomal"
    },{
      memo: "Hiware",
      userId : "123456",
      userPw : "password",
      uid : "2",
      regDate : "20230101",
      accountStatus : "nomal"
    }];

    setAccounts(fakeData);
    setFilterAccounts(fakeData);
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
    <Wrapper height={"550px"}>
      <AccountListHeader />
      <AccountSearchBar />
      <div className="w-full h-full overflow-auto">
        {filterAccounts.length > 0 && filterAccounts.map((account, index) => {
          return <AccountItem key={account.uid+index} idx={index+1} account={account}/>
        })}
        {
          filterAccounts.length === 0 && <p>no data.</p>
        }
      </div>
    </Wrapper>
  );
};

export default AccountList;






