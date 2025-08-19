// src/Components/AccountBalance.js
import React, { useMemo, useState } from "react";
import { Dropdown, Table, Form, ButtonGroup } from "react-bootstrap";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import batchData from "../assests/Data/batchData.json";
import vendorData from "../assests/Data/vendorData.json";

// Mask account number
function maskAccountNumber(accNo = "") {
  if (!accNo) return "";
  const s = String(accNo);
  if (s.length <= 8) return s;
  return s.slice(0, 4) + "****" + s.slice(-4);
}

// Expand batch into transactions
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

// Convert dd-MM-yyyy to JS Date
function parseDDMMYYYY(str) {
  const [day, month, year] = str.split("-");
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0); // normalize to midnight
  return date;
}

// Convert JS Date to dd-MM-yyyy
function formatDDMMYYYY(date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

// Get only date part from "dd-MM-yyyy HH:mm" string
function txnDateOnly(txnDateStr) {
  const datePart = txnDateStr.split(" ")[0]; // "dd-MM-yyyy"
  return parseDDMMYYYY(datePart);
}

export default function AccountBalance() {
  const [selected, setSelected] = useState(0);
  const [filterMethod, setFilterMethod] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const allAccounts = useMemo(() => [...batchData, ...vendorData], []);

  const selectedAccount =
    allAccounts[selected] || {
      type: "",
      accountNo: "",
      openingBalance: 0,
      transactions: [],
    };

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

  // --- FILTERING ---
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

  // Export functions (same as before)
  const exportExcel = () => { /* ... */ };
  const exportPDF = () => { /* ... */ };
  const exportJSON = () => { /* ... */ };

  return (
    <div className="container py-4">
      {/* Account Info */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <div>
            <Form.Label className="fw-bold mb-2">Select Account</Form.Label>
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
          </div>
          <div className="mt-3 mt-md-0 text-md-end">
            <div className="fw-bold">Account Number: {selectedAccount.accountNo}</div>
            <div className="h5 fw-bold text-success">
              Current Balance: ₹ {currentBalance.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Table */}
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
          <span className="fw-bold">Transaction History</span>
          <div className="d-flex flex-column align-items-start gap-2">
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

            {/* Plain input for date in dd-MM-yyyy */}
            <input
              type="text"
              placeholder="From Date (dd-MM-yyyy)"
              className="form-control form-control-sm w-100"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />

            <input
              type="text"
              placeholder="To Date (dd-MM-yyyy)"
              className="form-control form-control-sm w-100"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

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
                    <td className={txn.amountNumber < 0 ? "text-danger" : "text-success"}>
                      {txn.amountNumber.toLocaleString("en-IN")}
                    </td>
                    <td>{txn.status}</td>
                    <td>₹ {txn.runningBalance.toLocaleString("en-IN")}</td>
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
