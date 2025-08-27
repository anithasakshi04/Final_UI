import React, { useState } from 'react';
import "../PayrollFormApp.css";
import PayrollForm from "../Components/PayrollForm";

function App() {
  // Mock Batches
  const [batches] = useState([
    { id: 'E000021', name: 'April Salary 2025' },
    { id: 'E000022', name: 'May Salary 2025' },
    { id: 'E000023', name: 'June Salary 2025' }
  ]);

  const [selectedBatch, setSelectedBatch] = useState('E000021');
  const [paymentType, setPaymentType] = useState('Domestic');
  const [currency] = useState('INR (India)');
  const [debitAccount, setDebitAccount] = useState('');
  const [accountType, setAccountType] = useState('');
  const [date, setDate] = useState('');

  // Generate 10 employees for each batch
  const batchEmployees = {
    'E000021': Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      method: ['NEFT', 'RTGS', 'IMPS', 'SWIFT', 'AUTO'][Math.floor(Math.random() * 5)],
      payeeDetails: 'Empl',
      payeeName: `Employee ${i + 1}`,
      bankDetails: `Bank ${i + 1}, City`,
      yourReference: `Salary-April-${i + 1}`,
      paymentReference: `PAY-${i + 1}`,
      amount: Math.floor(15000 + Math.random() * 25000),
      notes: 'Monthly salary'
    })),
    'E000022': Array.from({ length: 10 }, (_, i) => ({
      id: i + 11,
      method: ['NEFT', 'RTGS', 'IMPS', 'SWIFT', 'AUTO'][Math.floor(Math.random() * 5)],
      payeeDetails: 'Empl',
      payeeName: `Employee ${i + 1}`,
      bankDetails: `Bank ${i + 1}, City`,
      yourReference: `Salary-May-${i + 1}`,
      paymentReference: `PAY-${i + 11}`,
      amount: Math.floor(15000 + Math.random() * 25000),
      notes: 'Monthly salary'
    })),
    'E000023': Array.from({ length: 10 }, (_, i) => ({
      id: i + 21,
      method: ['NEFT', 'RTGS', 'IMPS', 'SWIFT', 'AUTO'][Math.floor(Math.random() * 5)],
      payeeDetails: 'Empl',
      payeeName: `Employee ${i + 1}`,
      bankDetails: `Bank ${i + 1}, City`,
      yourReference: `Salary-June-${i + 1}`,
      paymentReference: `PAY-${i + 21}`,
      amount: Math.floor(15000 + Math.random() * 25000),
      notes: 'Monthly salary'
    }))
  };

  const rows = batchEmployees[selectedBatch] || [];

  // TODO: For addRow, removeRow, handleInputChange,
  // consider managing batchEmployees state properly (not shown here).

  const addRow = () => { /* Implementation omitted for brevity */ };
  const removeRow = (id) => { /* Implementation omitted for brevity */ };
  const handleInputChange = (id, field, value) => { /* Implementation omitted for brevity */ };

  const totalAmount = rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);

  return (
    <div className="payroll-container">
      <div className="payroll-inner">
        <PayrollForm
          batches={batches}
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          debitAccount={debitAccount}
          setDebitAccount={setDebitAccount}
          accountType={accountType}
          setAccountType={setAccountType}
          date={date}
          setDate={setDate}
          rows={rows}
          handleInputChange={handleInputChange}
          removeRow={removeRow}
          addRow={addRow}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
}

export default App;
