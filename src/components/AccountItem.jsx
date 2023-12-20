import trash from "../assets/images/icon/Trash.png"
import copySimple from "../assets/images/icon/CopySimple.png"

const AccountItem = ({account,removeBtnClickHandler,copyBtnClickHandler}) => {
  const accountModClickHandler = (e) => {
    const uid = e.currentTarget.dataset.uid;
    alert("Modify Account Comming sooooon.. ");
  }

  const linkBtnClickHandler = (e) => {
    alert('Location link Comming sooooooooon...');
    // const url = e.currentTarget.dataset.url;
    // window.location.href = url;
    // url 이동 
    // 클라이언트의 IP/PW 삽입
  }

  const getLinkBtnColor = (url) => {
    if(url && url !== ''){
      return `text-lime-700 bg-lime-100 cursor-pointer`;
    }
    return `text-gray-500 bg-gray-100 cursor-default`;
  }

  const {memo , ui , uid ,saveDate} = account;
  return (
    <div className="flex flex-row gap-1 justify-between pl-2 pr-5 p-3 border-b border-b-slate-100 items-center">
      <div className="flex flex-row gap-5 items-center">
        <div>
          <div>
            <a onClick={linkBtnClickHandler} data-url={'url'} className={`text-xs px-2 py-1 ${getLinkBtnColor('url')} rounded-md`}>Link</a>
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