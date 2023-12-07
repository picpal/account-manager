import { useState } from 'react'; // 상단에 추가
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import InputPin from "./components/InputPin";
import AccountList from './components/AccountList';

function App() {
  const [login, setLogin] = useState(false); // 계정 데이터

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputPin setLogin={setLogin}/>}></Route>
        <Route path="/list/*" element={<AccountList login={login} />}></Route>
        {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
        <Route path="*" element={<InputPin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
