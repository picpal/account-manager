import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import InputPin from "./components/InputPin";
import AccountList from './components/AccountList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputPin />}></Route>
        <Route path="/list/*" element={<AccountList />}></Route>
        {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
        <Route path="*" element={<InputPin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
