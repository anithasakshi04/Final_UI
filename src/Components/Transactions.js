import React,{use, useEffect, useState} from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import jsPDF from "jspdf";
 
 
export function Transactions({loggedInUserId}){
 
    const [allTransactions, setAllTransactions] = useState([
        {userId:1,
            id: "TXN001" ,
            type: "Salary",
            date: "07/30/2025",
            amount: "50000",
            status:"Approved",
            actions:["edit"]
        },
 
        {userId:2,
            id: "TXN222" ,
            type: "Vendor",
            date: "04/28/2022",
            amount:"4000",
            status: "Approved",
            actions:[""]
        },
        {userId:2,
            id: "TXN123" ,
            type: "Salary",
            date: "07/30/2025",
            amount: "5000",
            status:"Pending",
            actions:["edit"]
        },
        {userId:1,
            id: "TXN151" ,
            type: "Salary",
            date: "03/27/2023",
            amount: "54000",
            status: "Rejected",
            actions:["edit"]
        },
        {userId:1,
            id: "TXN177" ,
            type: "Vendor",
            date: "06/04/2025",
            amount: "15100",
            status:"Approved",
            actions:["edit"]
        },
    ]);
    const [transactions, setTransactions]=useState([]);
    //const [filteredTransactions,setFilteredTransactions]=useState(transactions);
    const [statusFilter,setStatusFilter]=useState("");
    //const [dateFilter,setDateFilter]=useState("");
    const [currentuserId, setLogs] = useState(loggedInUserId)
    const [selected,setSelected]=useState([]);
    useEffect(()=>{
        if(!allTransactions) return;
        console.log("loggedInUserId:",currentuserId);
 
        const userTransactions=Array.isArray(allTransactions)
        ? allTransactions.filter(txn => txn.userId === currentuserId)
        : [];
        setTransactions(userTransactions);
    }, [allTransactions, currentuserId]);
    return(
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <div className="d-flex align-items-center">
               
                <div className="fw-bold fs-4">User Info</div>
                </div>
                {/* <div>
                    <a href="#!" className="me-3 text-decoration-none">Dashboard</a>
                    <a href="#!" className="me-3 text-decoration-none">Transactions</a>
                    <a href="#!" className="me-3 text-decoration-none">Batches</a>
 
                </div> */}
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
                <button className="btn btn-outline-info w-100" >Apply filters</button>
            </div>
        </div>
 
        <table className="table table-bordered align-middle">
            <thead className="table-primary">
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
                                    className="btn btn-sm btn-outline-primary me-2">{action}</button>
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
            {/* <button className="btn btn-primary" onClick={()=>{
                if(selected.length===0){
                    alert("Please select atleast one transaction");
                    return;
                }
                const updated=transactions.map(txn=>selected.includes(txn.id)?{...txn,status:"Mark as Viewed"}:txn);
                setTransactions(updated);
                setSelected([]);
            }}>Mark as Viewed</button> */}
            {/* <button className="btn btn-success">Archive Selected</button> */}
            <button className="btn btn-outline-primary" onClick={ ()=>{ if(selected.length===0){
                alert("Please Select atleaset one transaction");
                return;
           
            }
            const doc=new jsPDF();
            doc.setFontSize(16);
            doc.text("Slected Transactions",20,20);
            let y=40;
            selected.forEach((id,index)=>{
                const txn=transactions.find(t=>t.id===id);
                if(txn){
                    doc.text(
                        `#${index+1} | ID; ${txn.id} | Type: ${txn.type} | Date: ${txn.date} | Amount: ${txn.amount} | Status: ${txn.status}`,
                        20,y);
                        y+=10;
                }
            });
            doc.save("transactions.pdf");
            }}>Export to Excel</button>
        </div>
        </div>
    );
 
 
   
};
export default Transactions;