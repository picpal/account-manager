import React, { useEffect, useRef, useState } from "react";
import menuImage from '../assets/images/icon/menu.png';
import PlusCircle from '../assets/images/icon/PlusCircle.png';
import AccountMenu from "./AccountMenu";
import AccountInputPopup from "./AccountInputPopup";
import { useRecoilState } from "recoil";
import { showPopupState } from "../state/atoms";

const AccountListHeader = () => {
  const [showPopup, setShowPopup] = useRecoilState(showPopupState);
  const [showMenu , setShowMenu] = useState(false);
	const menuRef = useRef(null); 	// Ref 디폴트값 null로 지정

  useEffect(() => {
      // 특정 영역 외 클릭 시 발생하는 이벤트
    function handleMenu(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
          setShowMenu(false);
        }
    }
      
    // 이벤트 리스너에 handleFocus 함수 등록
    document.addEventListener("mouseup", handleMenu);
    return () => { document.removeEventListener("mouseup", handleMenu); }
  }, [menuRef]);

  const handleAddButtonClick = () => {
    setShowPopup((pre)=>{
      return {...pre , ...{mode:"new" , show:true}}
    });
  }

  const handleMenuButtonClick = () => {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center pt-4 pb-4 relative top-0 z-40">
        <div className="flex flex-row gap-4 items-center">
          <div ref={menuRef} className="cursor-pointer hover:opacity-70" onClick={handleMenuButtonClick}>
            <img className="w-7" src={menuImage} alt="메뉴" />
          </div>
          <div>
            <h1 className="text-xl text-gray-700 cursor-default">My Account List</h1>
          </div>
        </div>
        <div className="cursor-pointer hover:opacity-70" onClick={handleAddButtonClick}>
          <img className="w-6" src={PlusCircle} alt="목록 추가 버튼" />
        </div>

        <AccountMenu showMenu={showMenu} />
      </div>

      {showPopup.show && <AccountInputPopup />}
    </>
  )
}

export default AccountListHeader;