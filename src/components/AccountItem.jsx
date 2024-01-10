import trash from "../assets/images/icon/Trash.png"
import linkIcon from "../assets/images/icon/Link.png"
import copySimple from "../assets/images/icon/CopySimple.png"

const AccountItem = ({account,removeBtnClickHandler,copyBtnClickHandler,linkBtnClickHandler,accountModClickHandler}) => {
  const getLinkBtnColor = (url) => {
    if(url && url !== ''){
      return `hover:opacity-70`;
    }
    return `opacity-20 cursor-default`;
  }

  const {memo , ui , uid ,saveDate,url} = account;
  return (
    <div className="flex flex-row gap-5 justify-between py-3 pl-1 pr-3 border-b border-b-slate-100 items-center w-full">
      <div className="flex w-2/3 flex-row gap-5 items-center">
        <div className="flex w-full flex-col gap-1 cursor-pointer" onClick={accountModClickHandler} data-uid={uid}>
          <div className="text-lg whitespace-nowrap overflow-hidden text-ellipsis">{memo}</div>
          <div className="text-xs text-gray-400">ID : {ui.substring(0,18)}</div>
          <div className="text-xs text-gray-400">변경일 : {saveDate}</div>
        </div>
      </div>

      <div className="flex w-24 flex-row items-center gap-3">
        <button type="button" className={`${getLinkBtnColor(url)}`} onClick={linkBtnClickHandler} data-url={url} data-uid={uid}><img className="w-6" src={linkIcon}  alt="링크 버튼" /></button>
        <button type="button" className="hover:opacity-70" onClick={removeBtnClickHandler} data-uid={uid}><img className="w-6" src={trash}  alt="삭제 버튼" /></button>
        <button type="button" className="hover:opacity-70" onClick={copyBtnClickHandler} data-uid={uid}><img className="w-6" src={copySimple} alt="복사 버튼" /></button>
      </div>
    </div>
  )
}

export default AccountItem;