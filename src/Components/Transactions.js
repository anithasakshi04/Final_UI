import React,{useEffect, useState} from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
 
// const lol = ;
export function Transactions({loggedInUserId}){
// const Transactions = ({loggedInUserId}) =>{
    const [allTransactions, setAllTransactions] = useState([
        {userId:1, id: "TXN001" , type: "Salary", date: "2025-08-31", amount: "50000",status:"Approved", actions:["view","edit"]},
        {userId:2, id: "TXN222" , type: "Vendor", date: "2025-07-31", amount:"4000",status: "Approved", actions:["view"]},
        {userId:2, id: "TXN123" , type: "Salary", date: "2025-07-30", amount: "5000", status:"Pending", actions:["view","edit"]},
        {userId:1, id: "TXN151" , type: "Salary", date: "2025-06-30", amount: "54000", status: "Rejected", actions:["view"]},
        {userId:1, id: "TXN177" , type: "Loan", date: "2025-06-04", amount: "15100",status:"Approved", actions:["view","edit"]},
    ]);
    const [transactions, setTransactions]=useState([]);
    const [lol, setLogs] = useState(loggedInUserId)
    useEffect(()=>{
        if(!allTransactions) return;
        console.log("loggedInUserId:",lol);
 
        const userTransactions=Array.isArray(allTransactions)
        ? allTransactions.filter(txn => txn.userId === lol)
        : [];
        setTransactions(userTransactions);
    }, [allTransactions, lol]);
    return(
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <div className="d-flex align-items-center">
               
                <div className="fw-bold fs-4">User Info</div>
                </div>
                <div>
                    <a href="#!" className="me-3 text-decoration-none">Dashboard</a>
                    <a href="#!" className="me-3 text-decoration-none">Transactions</a>
                    <a href="#!" className="me-3 text-decoration-none">Batches</a>
 
                </div>
            </div>
            <h4 className="mb-4">View &amp; Manage Transactions</h4>
 
            <div className="row g-2 mb-3">
                <div className="col-md-3">
                    <input type="date" className="form-control"/>
 
                </div>
                <div className="col-md-3">
                    <select className="form-select">
                        <option>Transactions</option>
                        <option>Salary</option>
                        <option>Vendor</option>
                        <option>Transfer</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Status" />
 
            </div>
            <div className="col-md-3">
                <button className="btn btn-outline-dark w-100">Apply filters</button>
            </div>
        </div>
 
        <table className="table table-bordered align-middle">
            <thead className="table-light">
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {transactions.length>0 ?(
                    transactions.map((txn)=>(
                        <tr key={txn.id}>
                            <td><input type="checkbox" /></td>
                            <td>{txn.id}</td>
                            <td>{txn.type}</td>
                            <td>{txn.date}</td>
                            <td>{txn.amount}</td>
                            <td>
                                {txn.actions.map((action,index)=>(
                                    <button
                                    key={index}
                                    className="btn btn-sm btn-outline-dark me-2">{action}</button>
                                ))}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" className="text-center text-muted">No transactions found for this user</td>
                    </tr>
                )}
            </tbody>
        </table>
 
        <div className="d-flex justify-content-end gap-2 mt-4 ">
            <button className="btn btn-success">Mark as Viewed</button>
            <button className="btn btn-danger">Archive Selected</button>
            <button className="btn btn-outline-primary">Export to Excel</button>
        </div>
        </div>
    );
 
 
   
};
export default Transactions;