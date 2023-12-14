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
import {accountsNextStatus} from "../state/selector"

const AccountList = () => {
  const [, setDbManager] = useState(null); // IDB object
  const loginState = useRecoilValue(loginNextState);
  const [accounts,setAccounts] = useRecoilState(accountsState);
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
      setAccounts(res);
      setFilterAccounts(res);
    })
  }, []);

  // 목록 변경 시 리렌더링을 위한 effect
  useEffect(() => {
    setFilterAccounts(accounts);
  },[accounts]);

  return (
    <Wrapper height={"550px"}>
      <AccountListHeader />
      <AccountSearchBar />
      <div className="w-full h-full overflow-auto" >
        {filterAccounts.length > 0 && filterAccounts.map((account, index) => {
          return <AccountItem key={account.uid} idx={index+1} account={account}/>
        })}
        {
          filterAccounts.length === 0 && <p className='py-10 text-center'>no data.</p>
        }
      </div>
    </Wrapper>
  );
};

export default AccountList;






