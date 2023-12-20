import React from "react";
import UploadSimple from '../assets/images/icon/UploadSimple.png'
import DownloadSimple from '../assets/images/icon/DownloadSimple.png'
import ArrowsCounterClockwise from '../assets/images/icon/ArrowsCounterClockwise.png'


const AccountMenu = ({showMenu}) => {
  const clickHandlerImportData = () => {
    alert("Upload Account Data  Comming sooooon.. ");
  }

  const clickHandlerExportData = () => {
    alert("Download Account Data Comming sooooon.. ");
  }

  const clickHandlerResetData = () => {
    alert("Reset Account Data Comming sooooon.. ");
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