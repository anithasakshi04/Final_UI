// src/Components/AccountBalance.js
import React, { useMemo, useState } from "react";
import { Dropdown, Table, Form, DropdownButton, ButtonGroup } from "react-bootstrap";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import batchData from "../assests/Data/batchData.json";
import vendorData from "../assests/Data/vendorData.json";

// --- Mask account number ---
function maskAccountNumber(accNo = "") {
  if (!accNo) return "";
  const s = String(accNo);
  if (s.length <= 8) return s;
  return s.slice(0, 4) + "****" + s.slice(-4);
}

// --- Expand batch into transactions ---
function expandBatch(batch, isVendor = false) {
  if (!batch || !batch.transactions) return [];
  const batchName = isVendor ? "Vendor Payments" : "Employee Payroll";
  const approvalDate = batch.approvalDate;

  return batch.transactions
    .filter((txn) => txn.status !== "Pending")
    .map((txn) => {
      const txnDate = !isVendor && approvalDate ? approvalDate : txn.date;
      return {
        id: txn.id,
        batchId: isVendor ? `V-${txn.id.split("-")[1]}` : `E-${txn.id.split("-")[1]}`,
        batchName,
        date: txnDate,
        toAccountDisplay: txn.toAccount,
        amountNumber: -Math.abs(txn.amount),
        method: txn.method,
        status: txn.status || "Approved",
      };
    });
}

// --- Date helpers ---
function parseDDMMYYYY(str) {
  const [day, month, year] = str.split("-");
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
}
function txnDateOnly(txnDateStr) {
  return parseDDMMYYYY(txnDateStr.split(" ")[0]); // only dd-MM-yyyy
}

export default function AccountBalance() {
  const [selected, setSelected] = useState(0);
  const [filterMethod, setFilterMethod] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currency, setCurrency] = useState("INR"); // --- NEW state

  const allAccounts = useMemo(() => [...batchData, ...vendorData], []);

  const selectedAccount =
    allAccounts[selected] || {
      type: "",
      accountNo: "",
      openingBalance: 0,
      transactions: [],
    };

  // --- Currency Conversion Rates ---
  const conversionRates = {
    INR: { rate: 1, symbol: "₹" },
    USD: { rate: 0.012, symbol: "$" }, // Example: 1 INR ≈ 0.012 USD
    EUR: { rate: 0.011, symbol: "€" }, // Example: 1 INR ≈ 0.011 EUR
  };

// --- Always format in INR as base currency
const formatINR = (amount) => {
  return `₹ ${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// --- Get equivalent in selected currency
const getEquivalent = (amount) => {
  const { rate, symbol } = conversionRates[currency];
  if (currency === "INR") return ""; // Don't show if INR selected
  return `${symbol} ${(amount * rate).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

  // --- Enriched transactions ---
  const enrichedTxns = useMemo(() => {
    let running = selectedAccount.openingBalance;

    return allAccounts
      .flatMap((acc) =>
        acc.accountNo.startsWith("789") ? expandBatch(acc, true) : expandBatch(acc, false)
      )
      .map((txn) => {
        running += txn.amountNumber;
        return { ...txn, runningBalance: running };
      });
  }, [allAccounts, selectedAccount]);

  // --- Filtering ---
  const filteredTxns = useMemo(() => {
    return enrichedTxns.filter((txn) => {
      if (filterMethod !== "All" && txn.method !== filterMethod) return false;

      const txnDate = txnDateOnly(txn.date);

      if (fromDate && txnDate < parseDDMMYYYY(fromDate)) return false;
      if (toDate && txnDate > parseDDMMYYYY(toDate)) return false;

      return true;
    });
  }, [enrichedTxns, filterMethod, fromDate, toDate]);

  const currentBalance =
    enrichedTxns.length > 0
      ? enrichedTxns[enrichedTxns.length - 1].runningBalance
      : selectedAccount.openingBalance;

  // --- Export Functions ---
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredTxns);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction History", 14, 15);
    doc.autoTable({
      head: [["Batch ID", "Batch Name", "Txn ID", "Date", "Counterparty", "Amount", "Status", "Balance"]],
      body: filteredTxns.map((txn) => [
        txn.batchId,
        txn.batchName,
        txn.id,
        txn.date,
        txn.toAccountDisplay,
        txn.amountNumber,
        txn.status,
        txn.runningBalance,
      ]),
      startY: 20,
    });
    doc.save("transactions.pdf");
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(filteredTxns, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
  };

  return (
    <div className="container py-4">
      {/* Account Info */}
      <div className="card mb-4 shadow-sm">
  <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
    
    {/* LEFT SIDE */}
    <div>
      <Form.Label className="fw-bold mb-2">Select Account</Form.Label>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Account Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="outline-success" id="dropdown-account">
            {maskAccountNumber(selectedAccount.accountNo)} ({selectedAccount.type})
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {allAccounts.map((acc, idx) => (
              <Dropdown.Item
                key={acc.accountNo}
                onClick={() => setSelected(idx)}
                active={selected === idx}
              >
                {maskAccountNumber(acc.accountNo)} ({acc.type})
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Currency Dropdown */}
        <DropdownButton
          size="sm"
          variant="outline-secondary"
          title={`Currency: ${currency}`}
          id="dropdown-currency"
          style={{ minWidth: "150px", textAlign: "center" }}
        >
          {Object.keys(conversionRates).map((cur) => (
            <Dropdown.Item key={cur} onClick={() => setCurrency(cur)}>
              {cur}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="mt-3 mt-md-0 text-md-end">
      <div className="fw-bold">Account Number: {selectedAccount.accountNo}</div>
      <div className="h5 fw-bold text-success">
        Base Currency Balance: {formatINR(currentBalance)}
        {currency !== "INR" && (
          <span className="ms-3">
            Currency Equivalent Balance: {getEquivalent(currentBalance)}
          </span>
        )}
      </div>
    </div>
  </div>
</div>


      {/* Filters + Export Dropdown + Currency Dropdown */}
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
          <span className="fw-bold">Transaction History</span>

          {/* <ButtonGroup> */}
            

            <DropdownButton
              size="sm"
              variant="primary"
              title="Download"
              id="dropdown-download"
              align="end"
            >
              <Dropdown.Item onClick={exportExcel}>Export as Excel</Dropdown.Item>
              <Dropdown.Item onClick={exportPDF}>Export as PDF</Dropdown.Item>
              <Dropdown.Item onClick={exportJSON}>Export as JSON</Dropdown.Item>
            </DropdownButton>
          {/* </ButtonGroup> */}
        </div>

        {/* Filters */}
        <div className="p-3 d-flex flex-column flex-md-row gap-2">
          <Form.Select
            size="sm"
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            style={{ width: "160px" }}
          >
            <option value="All">All Methods</option>
            <option value="NEFT">NEFT</option>
            <option value="RTGS">RTGS</option>
            <option value="IMPS">IMPS</option>
            <option value="AUTO">AUTO</option>
          </Form.Select>

          <input
            type="text"
            placeholder="From Date (dd-MM-yyyy)"
            className="form-control form-control-sm"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="To Date (dd-MM-yyyy)"
            className="form-control form-control-sm"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="card-body p-0">
          <Table bordered responsive className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Batch ID</th>
                <th>Batch Name</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Counterparty</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Running Balance</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.length ? (
                filteredTxns.map((txn) => (
                  <tr key={txn.id}>
                    <td>{txn.batchId}</td>
                    <td>{txn.batchName}</td>
                    <td>{txn.id}</td>
                    <td>{txn.date}</td>
                    <td>{txn.toAccountDisplay}</td>
                    <td>₹{txn.amountNumber}</td>
                    <td>{txn.status}</td>
                    <td>₹ {txn.runningBalance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-3">
                    No transactions match the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
