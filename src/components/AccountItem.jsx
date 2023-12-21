import trash from "../assets/images/icon/Trash.png"
import copySimple from "../assets/images/icon/CopySimple.png"

const AccountItem = ({account,removeBtnClickHandler,copyBtnClickHandler,linkBtnClickHandler,accountModClickHandler}) => {
  const getLinkBtnColor = (url) => {
    if(url && url !== ''){
      return `border-blue-200 text-blue-700 bg-blue-100 cursor-pointer hover:opaticy-0.7`;
    }
    return `border-gray-200 text-gray-500 bg-gray-100 cursor-default`;
  }

  const {memo , ui , uid ,saveDate,url} = account;
  return (
    <div className="flex flex-row gap-1 justify-between pl-2 pr-5 p-3 border-b border-b-slate-100 items-center">
      <div className="flex flex-row gap-5 items-center">
        <div>
          <div onClick={linkBtnClickHandler} data-url={url} data-uid={uid} className={`rounded-md  leading-3 text-center py-1 px-2 ${getLinkBtnColor(url)}`}>
            <span className="text-xs">Move</span>
            <br />
            <span className="text-xs">URL</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 cursor-pointer" onClick={accountModClickHandler} data-uid={uid}>
          <div className="text-lg">{memo.substring(0,11)}</div>
          <div className="text-xs">ID : {ui.substring(0,18)}</div>
          <div className="text-xs">변경일 : {saveDate}</div>
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