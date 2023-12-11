import React from "react";
import menuImage from '../assets/images/icon/menu.png';
import PlusCircle from '../assets/images/icon/PlusCircle.png';
import ArrowsCounterClockwise from '../assets/images/icon/ArrowsCounterClockwise.png'
import DownloadSimple from '../assets/images/icon/DownloadSimple.png'
import UploadSimple from '../assets/images/icon/UploadSimple.png'
import AccountMenu from "./AccountMenu";
import NewAccountPopup from "./NewAccountPopup";

const AccountListHeader = () => {

  return (
    <>
      <div className="flex flex-row justify-between items-center pt-4 pb-4 relative top-0 z-50">
        <div className="flex flex-row gap-3 items-center">
          <div className="cursor-pointer hover:opacity-70">
            <img src={menuImage} alt="메뉴" />
          </div>
          <div>
            <h1>My Account List</h1>
          </div>
        </div>
        <div className="cursor-pointer hover:opacity-70">
          <img src={PlusCircle} alt="목록 추가 버튼" />
        </div>

        <AccountMenu />
      </div>

      <NewAccountPopup />
    </>
  )
}

export default AccountListHeader;