import React from "react";
import NewAccountPopupInput from "./NewAccountPopupInput";

const NewAccountPopup = () => {
  return (
    <div className="hidden absolute top-0 w-full h-full ">
      <div className="absolute z-50  top-0 left-0 w-full h-full bg-slate-800 opacity-60">
      </div>
      <div className="relative z-50 w-3/4 mx-auto mt-4 p-6 rounded-sm bg-white">
        <NewAccountPopupInput type={"text"} lebel={"서비스/프로그램 명"}/>
        <NewAccountPopupInput type={"text"} lebel={"계정"}/>
        <NewAccountPopupInput type={"password"} lebel={"비밀번호"}/>
        <NewAccountPopupInput type={"password"} lebel={"비밀번호 확인"}/>
        <NewAccountPopupInput type={"date"} lebel={"비밀번호 변경일자"}/>
        
        <div className="mt-3 text-sm flex flex-row gap-3 align-middle justify-end">
          <button className="px-4 py-1 rounded-md bg-lime-700 text-white hover:opacity-70">저장</button>
          <button className="px-4 py-1 rounded-md bg-red-700 text-white hover:opacity-70">취소</button>
        </div>
      </div>
    </div>
  )
}

export default NewAccountPopup;