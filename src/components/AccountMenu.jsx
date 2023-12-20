import React, { useEffect, useState } from "react";
import UploadSimple from '../assets/images/icon/UploadSimple.png'
import DownloadSimple from '../assets/images/icon/DownloadSimple.png'
import ArrowsCounterClockwise from '../assets/images/icon/ArrowsCounterClockwise.png'
import IndexedDBManager from '../api/IndexedDBManager';
import { useRecoilState } from "recoil";
import { accountsState } from "../state/atoms"



const AccountMenu = ({showMenu}) => {
  const [ ,setAccounts] = useRecoilState(accountsState);
  const [dbManager , setDbManager] = useState();

  useEffect(() => {
    const indexedDBManager = new IndexedDBManager();
    setDbManager(indexedDBManager);
  }, []);

  const clickHandlerImportData = () => {
    
    alert('Upload File');
  }

  const clickHandlerExportData = async () => {
    const data = await dbManager.getDataAll('accountList');
    const blob = new Blob([JSON.stringify(data)], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    // a태그를 이용하여 blob 객체 호출
    const a = document.createElement('a');
    a.href = url;
    a.download = "account_backup";
    document.body.appendChild(a);

    // 트리거
    a.click();

    // 다운로드 후 a 태그를 제거하고, Blob URL을 해제합니다.
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  const clickHandlerResetData = () => {
    if(window.confirm("모든 데이터를 삭제 하시겠습니까?")){
      dbManager.clearDatabase('accountList');
      setAccounts([]);
    }
  }

  return(
    <div className={`${showMenu ? "" : "hidden"} absolute top-10 z-40 p-4 border border-slate-100 rounded-md bg-white shadow-sm`}>
      <ul className="text-sm flex flex-col gap-3">
        <li className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70" onClick={clickHandlerImportData}>
          <span><img className="w-5" src={UploadSimple} alt="upload File" /></span>
          <span>Import Data</span>
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70" onClick={clickHandlerExportData}>
          <span><img className="w-5" src={DownloadSimple} alt="download File" /></span>
          <span>Export Data</span>
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70" onClick={clickHandlerResetData}>
          <span><img className="w-5" src={ArrowsCounterClockwise} alt="Reset Data" /></span>
          <span>Reset Data</span>
        </li>
      </ul>
    </div>
  )
}

export default AccountMenu;