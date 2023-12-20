import trash from "../assets/images/icon/Trash.png"
import copySimple from "../assets/images/icon/CopySimple.png"

const AccountItem = ({idx,account,removeBtnClickHandler,copyBtnClickHandler}) => {
  const accountModClickHandler = (e) => {
    const uid = e.currentTarget.dataset.uid;
    alert("Modify Account Comming sooooon.. ");
  }


  const {memo , ui , uid ,saveDate} = account;
  return (
    <div className="flex flex-row gap-1 justify-between pl-4 pr-5 p-3 border-b border-b-slate-100 items-center">
      <div className="flex flex-row gap-5 items-center">
        <div>
          <div className="p-5 text-center border border-slate-300 w-5 h-5 rounded-full flex items-center justify-center">
            {idx}
          </div>
        </div>

        <div className="flex flex-col gap-1 cursor-pointer" onClick={accountModClickHandler} data-uid={uid}>
          <div className="text-lg">{memo}</div>
          <div className="text-sm">ID : {ui} , 등록일 : {saveDate}</div>
          <div className="mt-1">
            <span className="text-xs px-2 py-1 bg-lime-100 text-lime-700 rounded-md">기간양호</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-3">
        <button type="button" className="hover:opacity-70" onClick={removeBtnClickHandler} data-uid={uid}><img className="w-6" src={trash}  alt="삭제 버튼" /></button>
        <button type="button" className="hover:opacity-70" onClick={copyBtnClickHandler} data-uid={uid}><img className="w-6" src={copySimple} alt="복사 버튼" /></button>
      </div>
    </div>
  )
}

export default AccountItem;