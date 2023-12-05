import React, { useState, useEffect } from 'react';
import Button from './Button';
import IndexedDBManager from '../api/IndexedDBManager';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]); // 계정 정보를 저장할 상태
  const [editMode, setEditMode] = useState(false); // 수정 모드 상태
  const [dbManager, setDbManager] = useState(null);

  useEffect(() => {
    const indexedDBManager = new IndexedDBManager();
    setDbManager(indexedDBManager);

    const initializeDB = async () => {
      try {
        // 모든 데이터 가져오기
        const data = await indexedDBManager.getAllData();
        setAccounts(data);
      } catch (error) {
        console.error('Error initializing DB:', error);
      }
    };

    initializeDB();
    
    // 컴포넌트가 언마운트될 때 데이터베이스를 닫을 수 있습니다.
    return () => {
      if (dbManager) {
        dbManager.close();
      }
    };
  }, []);


  const copyToClipboard = (id, pw) => {
    navigator.clipboard.writeText(`ID: ${id} / PW: ${pw}`);
  };

  const deleteAccount = (id) => {
    dbManager.deleteData(id);
    setAccounts(accounts.filter(account => account.id !== id));
  };

  // const updateAcoount = (id) => {
  //   const newData = { name: 'Updated Name', age: 31 };
  //   dbManager.updateData(id, ...newData);
  // }

  const addAccount = () => {
    const newData = { id: 'id', pw: 'password', memo: 'memo' };
    setAccounts([...accounts, newData]); // accounts 배열에 새로운 데이터(newData)를 추가하여 업데이트합니다.
    dbManager.addData(newData);
    setEditMode(true);
  };

  return (
    <div className="w-400 h-300 overflow-auto bg-slate-500">
      {accounts.map((account, index) => (
        <div key={index} className="flex items-center justify-between p-2 border-b border-gray-200">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{account.memo}</p>
            <p className="text-sm text-gray-500">{account.id}</p>
            <p className="text-sm text-gray-500">{account.pw}</p>
          </div>
          <div className="flex">
            <Button onClick={() => copyToClipboard(account.id, account.pw)} className="mr-2">복사</Button>
            <Button onClick={() => setEditMode(true)} className="mr-2">수정</Button>
            {editMode && <Button onClick={() => deleteAccount(account.id)} className="mr-2">삭제</Button>}
            {editMode && <Button onClick={() => setEditMode(false)} className="mr-2">저장</Button>}
          </div>
        </div>
      ))}
      <Button onClick={addAccount} className="mt-2">+</Button>
    </div>
  );
};

export default AccountList;






