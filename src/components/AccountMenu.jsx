import React, { useEffect, useState } from "react";
import UploadSimple from '../assets/images/icon/UploadSimple.png'
import DownloadSimple from '../assets/images/icon/DownloadSimple.png'
import ArrowsCounterClockwise from '../assets/images/icon/ArrowsCounterClockwise.png'
import IndexedDBManager from '../api/IndexedDBManager';


const AccountMenu = ({showMenu}) => {
  const [dbManager , setDbManager] = useState();

  useEffect(() => {
    console.log('one')
    const indexedDBManager = new IndexedDBManager();
    setDbManager(indexedDBManager);
  }, []);

  const clickHandlerImportData = () => {
    
    alert('Upload File');
  }

  const clickHandlerExportData = async () => {
    const data = await dbManager.getDataAll('accountList');
    console.log(JSON.stringify(data))
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
    }
  }

  return(
    <div className={`${showMenu ? "" : "hidden"} absolute top-10 z-40 p-4 border border-slate-100 rounded-md bg-white shadow-sm`}>
      <ul className="text-sm flex flex-col gap-2">
        <li className="flex flex-row gap-2 items-center cursor-pointer" onClick={clickHandlerImportData}>
          <span><img src={UploadSimple} alt="upload File" /></span>
          <span>Import Data</span>
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer" onClick={clickHandlerExportData}>
          <span><img src={DownloadSimple} alt="download File" /></span>
          <span>Export Data</span>
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer" onClick={clickHandlerResetData}>
          <span><img src={ArrowsCounterClockwise} alt="Reset Data" /></span>
          <span>Reset Data</span>
        </li>
      </ul>
    </div>
  )
}

export default AccountMenu;