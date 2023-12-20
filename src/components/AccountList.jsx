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
import { accountsState , filterAccountsState} from "../state/atoms"
import { decrypt } from '../encrypt/encrypt';

const AccountList = () => {
  const [dbManager, setDbManager] = useState(null); // IDB object
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


  return (
    <Wrapper height={"570px"}>
      <AccountListHeader />
      <AccountSearchBar />
      <div className="w-full h-[400px] overflow-y-auto" >
        {filterAccounts.length > 0 && filterAccounts.map((account, index) => {
          return <AccountItem key={account.uid}
                              account={account} 
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






