import "./styles/app.css"
import {Routes,Route,BrowserRouter} from "react-router-dom";
import DashBoardPage from "./pages/DashboardPage";
import AddExpensePage from "./pages/AddExpensePage";
import TablePage from  "./pages/TablePage"
import EditExpensePage from "./pages/EditExpensePage"

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashBoardPage/>}/>
      <Route path="/add" element={<AddExpensePage/>}/>
      <Route path="/table" element={<TablePage/>}/>
      <Route path="/edit/:id" element={<EditExpensePage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
