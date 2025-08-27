import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import React from "react";

function BatchList({ onSelectBatch }) {
  return (
    <div id="batch-list">
      <div className="action-buttons">
        <button className="approve">Approve Payroll</button>
        <button className="export">Export List</button>
      </div>

      <table style={{color:"black"}}>
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Batched By & On</th>
            <th>No. of Transactions</th>
            <th>Max Amount</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => onSelectBatch("E000021")}>
            <td>E000021</td>
            <td>Treasurer, 17-Aug-2025</td>
            <td>6</td>
            <td>₹120,000</td>
            <td>₹73,500</td>
            <td>Approved</td>
          </tr>
          
          <tr onClick={() => onSelectBatch("V000012")}>
            <td>V000012</td>
            <td>Manager, 29-July-2025</td>
            <td>3</td>
            <td>₹120,000</td>
            <td>₹102,000</td>
            <td>Approved</td>
          </tr>
          <tr onClick={() => onSelectBatch("V000013")}>
            <td>V000013</td>
            <td>Manager, 16-Aug-2025</td>
            <td>3</td>
            <td>₹120,000</td>
            <td>₹102,000</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BatchList;
