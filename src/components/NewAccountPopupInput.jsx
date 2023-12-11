import React from "react";

const NewAccountPopupInput = ({lebel,type}) => {
  return (
    <div className="py-2">
      <label className="flex flex-col gap-1 hover:opacity-70">
        <span className="text-xs">{lebel}</span>
        <input type={type} className="border border-gray-200 text-sm rounded-md px-3 py-2"/>
      </label>
    </div>
  )
}

export default NewAccountPopupInput;