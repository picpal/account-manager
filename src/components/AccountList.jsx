import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Button from './Button';
import IndexedDBManager from '../api/IndexedDBManager';

const AccountList = ({login}) => {
  const [accounts, setAccounts] = useState([]); // 계정 데이터
  const [dbManager, setDbManager] = useState(null); // IDB object

  const navigate = useNavigate();

  useEffect(() => {
    if(!login) navigate("/"); // login 상태 체크

    const indexedDBManager = new IndexedDBManager('accountList');
    setDbManager(indexedDBManager);

    const accounts = indexedDBManager.getDataAll("accountList");
    setAccounts(accounts);
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
    <div className="w-400 h-300 overflow-auto bg-slate-500">
      {accounts.length > 0 && accounts.map((account, index) => (
        <div key={index} className="flex items-center justify-between p-2 border-b border-gray-200">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{account.memo}</p>
            <p className="text-sm text-gray-500">{account.id}</p>
            <p className="text-sm text-gray-500">{account.pw}</p>
          </div>
          <div className="flex">
            <Button onClick={() => copyToClipboard(account.id, account.pw)} className="mr-2">복사</Button>
            <Button onClick={() => deleteAccount(account.uid)} className="mr-2">삭제</Button>
          </div>
        </div>
      ))}
      {
        !accounts && <p>no data.</p>
      }
    </div>
  );
};

export default AccountList;






