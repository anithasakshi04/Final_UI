// import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import AccountBalance from "./Components/AccountBalance";
import Home from "./Components/Home";
import BatchTransactionPage from './Components/BatchTransactionPage';
import { TransactionsProvider } from './contexts/TransactionContext';
import { Transactions } from './Components/Transactions';
import BatchMainContent from './Components/BatchMainContent';
import PayrollFormApp from './Components/PayrollFormApp';
// import Login from "./Components/Login";
import LoginPage from "./Components/LoginPage";
import { useState } from "react";


function App() {
  const loggedInUserId=1;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <TransactionsProvider>
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route element={<MainLayout/>}>
        <Route path="/home" element={<Home/>} />
        <Route path="/batchtxndetails" element={<BatchTransactionPage/>} />
        <Route path="/accountbalance" element={<AccountBalance />} />
        <Route path="/transactions" element={<Transactions loggedInUserId={loggedInUserId} />}/>
        <Route path="/paymentapproval" element={<BatchMainContent/>}/>
        <Route path="/payrollform" element={<PayrollFormApp/>}/>
      </Route>
    </Routes>
  </Router>
</TransactionsProvider>


 );
}
export default App;

