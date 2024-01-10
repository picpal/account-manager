import React from "react";
const AccountPopupInput = ({saveKeypressHandler,name,lebel,type,value,mode="new"}) => {
  let defaultValue = value;
  if(mode === 'new' && type === "date"){
    defaultValue = new Date().toISOString().split('T')[0];
  }

  return (
    <div className="py-1">
      <label className="flex flex-col gap-1 hover:opacity-70">
        <span className="text-sm">{lebel}</span>
        <input type={type} name ={name} defaultValue={defaultValue} onKeyUp={saveKeypressHandler} className="border border-gray-200 text-sm rounded-md px-3 py-1"/>
      </label>
    </div>
  )
}

export default AccountPopupInput;