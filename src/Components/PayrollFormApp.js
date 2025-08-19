// src/App.js
import React, { useState } from 'react';
import "../PayrollFormApp.css"
// Import the merged component
import PayrollForm from "../Components/PayrollForm";
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';

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

  const addRow = () => {
    const newId = Date.now();
    const nextIndex = rows.length + 1;
    const newRow = {
      id: newId,
      method: 'NEFT',
      payeeDetails: 'Empl',
      payeeName: `Employee ${nextIndex}`,
      bankDetails: '',
      yourReference: `Salary-${selectedBatch}-${nextIndex}`,
      paymentReference: `PAY-${newId}`,
      amount: '',
      notes: ''
    };
    const updatedBatch = { ...batchEmployees };
    updatedBatch[selectedBatch] = [...updatedBatch[selectedBatch], newRow];
    Object.assign(batchEmployees, updatedBatch);
  };

  const removeRow = (id) => {
    const updatedBatch = { ...batchEmployees };
    updatedBatch[selectedBatch] = updatedBatch[selectedBatch].filter(row => row.id !== id);
    Object.assign(batchEmployees, updatedBatch);
  };

  const handleInputChange = (id, field, value) => {
    const updatedBatch = { ...batchEmployees };
    updatedBatch[selectedBatch] = updatedBatch[selectedBatch].map(row =>
      row.id === id ? { ...row, [field]: value } : row
    );
    Object.assign(batchEmployees, updatedBatch);
  };

  const totalAmount = rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);

  return (
    <div className="App">
      <main className="main-content">
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
      </main>
    </div>
  );
}

export default App;