import React from "react";
const NewAccountPopupInput = ({name,lebel,type}) => {
  const defaultValue = type === "date" ? new Date().toISOString().split('T')[0] : "";

  return (
    
    <div className="py-2">
      <label className="flex flex-col gap-1 hover:opacity-70">
        <span className="text-sm">{lebel}</span>
        <input type={type} name ={name} defaultValue={defaultValue} className="border border-gray-200 text-sm rounded-md px-3 py-2"/>
      </label>
    </div>
  )
}

export default NewAccountPopupInput;