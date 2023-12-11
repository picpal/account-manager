import React from "react";
import magnifyingGlass from "../assets/images/icon/MagnifyingGlass.png"

const AccountSearchBar = () => {
  return (
    <div className="mt-1 mb-3">
      <div className="relative z-0">
        <div className="absolute top-3 left-3">
          <img src={magnifyingGlass} alt="찾기 이미지" />
        </div>
        <input className="bg-gray-100 rounded-md py-2 pl-9 pr-3 w-full" type="text" placeholder="Search for Account Memo"/>
      </div>
    </div>
  )
}

export default AccountSearchBar;