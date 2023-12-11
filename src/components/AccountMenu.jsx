import React from "react";
import UploadSimple from '../assets/images/icon/UploadSimple.png'
import DownloadSimple from '../assets/images/icon/DownloadSimple.png'
import ArrowsCounterClockwise from '../assets/images/icon/ArrowsCounterClockwise.png'


const AccountMenu = () => {
  return(
    <div className="hidden absolute top-10 z-40 p-4 border border-slate-100 rounded-md bg-white shadow-sm">
      <ul className="text-sm flex flex-col gap-2">
        <li className="flex flex-row gap-2 items-center cursor-pointer">
          <span><img src={UploadSimple} alt="upload File" /></span>
          <span>Import Data</span>
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer">
          <span><img src={DownloadSimple} alt="download File" /></span>
          <span>Export Data</span>
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer">
          <span><img src={ArrowsCounterClockwise} alt="Reset Data" /></span>
          <span>Reset Data</span>
        </li>
      </ul>
    </div>
  )
}

export default AccountMenu;