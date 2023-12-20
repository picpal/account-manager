import trash from "../assets/images/icon/Trash.png"
import copySimple from "../assets/images/icon/CopySimple.png"
import LockKey from "../assets/images/icon/LockKey.png"

const AccountItem = ({idx,account,removeBtnClickHandler,copyBtnClickHandler}) => {
  const accountModClickHandler = (e) => {
    const uid = e.currentTarget.dataset.uid;
    alert("Modify Account Comming sooooon.. ");
  }

  const getAccountStatus = (saveDate) => {
    const currentDate = new Date();
    const saveDateObj = new Date(saveDate);
    let diffDays = Math.ceil((saveDateObj - currentDate) / (1000 * 3600 * 24));
    
    let accountStatusNm = "";
    let accountStatusColor = "";
    let backgroundColor = "";

    if (diffDays <= 15) {
      accountStatusNm = "임박";
      accountStatusColor = "text-red-500";
      backgroundColor = "bg-red-100";
    }else if (diffDays < 0) {
      accountStatusNm = "만료";
      accountStatusColor = "text-gray-500";
      backgroundColor = "bg-gray-100";
    }else{
      accountStatusNm = "양호";
      accountStatusColor = "text-lime-700";
      backgroundColor = "bg-lime-100";
  
    }

    return {
      accountStatusNm,
      accountStatusColor,
      backgroundColor
    }
  }

  const {memo , ui , uid ,saveDate} = account;
  const {accountStatusNm,accountStatusColor,backgroundColor} = getAccountStatus(saveDate);
  
  return (
    <div className="flex flex-row gap-1 justify-between pl-2 pr-5 p-3 border-b border-b-slate-100 items-center">
      <div className="flex flex-row gap-5 items-center">
        <div>
          <div>
            <span className={`text-xs px-2 py-1 ${backgroundColor} ${accountStatusColor} rounded-md`}>{accountStatusNm}</span>
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