import React, { useEffect, useRef } from "react";
import magnifyingGlass from "../assets/images/icon/MagnifyingGlass.png"
import { useRecoilState } from "recoil";
import { accountsState , filterAccountsState } from "../state/atoms"

const AccountSearchBar = () => {
  const [accounts,] = useRecoilState(accountsState);
  const [,setFilterAccounts] = useRecoilState(filterAccountsState);
  const serchInput = useRef(null);

  const inputOnchangeHandler = (e) => {
    const val = e.target.value;
    const filterList = accounts.filter((item) => {
      const toTxt = item.memo?.toUpperCase().replace(/\s/g,'');
      const fromTxt = val?.toUpperCase().replace(/\s/gi,'');

      return toTxt.includes(fromTxt);
    });
    
    setFilterAccounts(filterList); // set accounts
  }

  useEffect(() => {
    serchInput.current.focus();
  },[]);

  return (
    <div className="mt-1 mb-3">
      <div className="relative z-0">
        <div className="absolute top-3 left-3">
          <img src={magnifyingGlass} alt="찾기 이미지" />
        </div>
        <input ref={serchInput} onChange={inputOnchangeHandler} className="bg-gray-100 rounded-md py-2 pl-9 pr-3 w-full" type="text"  placeholder="Search for Account Memo"/>
      </div>
    </div>
  )
}

export default AccountSearchBar;