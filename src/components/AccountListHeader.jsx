import React, { useEffect, useRef, useState } from "react";
import menuImage from '../assets/images/icon/menu.png';
import PlusCircle from '../assets/images/icon/PlusCircle.png';
import AccountMenu from "./AccountMenu";
import NewAccountPopup from "./NewAccountPopup";


const AccountListHeader = () => {
  const [showPopup, setShowPopup] = useState(false);
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
    setShowPopup(true);
  }

  const handleMenuButtonClick = () => {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center pt-4 pb-4 relative top-0 z-50">
        <div className="flex flex-row gap-3 items-center">
          <div ref={menuRef} className="cursor-pointer hover:opacity-70" onClick={handleMenuButtonClick}>
            <img src={menuImage} alt="메뉴" />
          </div>
          <div>
            <h1>My Account List</h1>
          </div>
        </div>
        <div className="cursor-pointer hover:opacity-70" onClick={handleAddButtonClick}>
          <img src={PlusCircle} alt="목록 추가 버튼" />
        </div>

        <AccountMenu showMenu={showMenu} />
      </div>

      {showPopup && <NewAccountPopup setShowPopup={setShowPopup}/>}
    </>
  )
}

export default AccountListHeader;