
import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

function BatchDetail({ batchId, goBack }) {
  if (!batchId) return null;

  return (
    <div id="batch-details" className="batch-details">
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>

      <div className="progress">
        <div className="step active">Batched</div>
        <div className="step active">Approver 1</div>
        <div className="step">Approver 2</div>
        <div className="step">Released to Bank</div>
      </div>

      <div className="batch-info">
        <div>
          <b>Batch ID:</b> {batchId}
        </div>
        <div>
          <b>Batched By & On:</b> Treasurer, 17-Aug-2025
        </div>
        <div>
          <b>No. of Payments:</b> 6
        </div>
        <div>
          <b>Max Debit Amount:</b> ₹120,000
        </div>
        <div>
          <b>Total Sum:</b> ₹73,500
        </div>
        <div>
          <b>Batching Criteria:</b> Standard
        </div>
      </div>

      <div className="batch-summary">
        <div>Payment 1 - ₹18000</div>
        <div>Payment 2 - ₹2500</div>
        <div>Payment 3 - ₹22000</div>
        <div>Payment 4 - ₹4000</div>
        <div>Payment 5 - ₹15000</div>
        <div>Payment 6 - ₹12000</div>
      </div>

      <div className="batch-actions">
        <button
          className="approve-batch"
          onClick={() => alert("Batch Approved!")}
        >
          Approve Batch
        </button>
        <button
          className="reject-batch"
          onClick={() => alert("Batch Rejected!")}
        >
          Reject Batch
        </button>
      </div>
    </div>
  );
}

export default BatchDetail;

